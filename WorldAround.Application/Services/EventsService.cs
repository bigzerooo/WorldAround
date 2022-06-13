using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Enums;
using WorldAround.Domain.Models.Base;
using WorldAround.Domain.Models.Events;
using WorldAround.Domain.Models.Paging;

namespace WorldAround.Application.Services;

public class EventsService : IEventsService
{
    private readonly IMapper _mapper;
    private readonly IWorldAroundDbContext _context;
    private readonly IBlobStorageGateway _blobStorageGateway;
    private IQueryable<Event> Events => _context.Events.Where(e => e.Display);

    public EventsService(
        IMapper mapper,
        IWorldAroundDbContext context,
        IBlobStorageGateway blobStorageGateway)
    {
        _mapper = mapper;
        _context = context;
        _blobStorageGateway = blobStorageGateway;
    }

    public async Task<GetEventsPageModel> GetEvents(GetDataParams @params, GetPageModel page)
    {
        var queryEvents = Events;

        return await GetEvents(queryEvents, @params, page, AccessibilityProfile.Public);
    }

    public async Task<EventDetailsModel> GetEvent(int id)
    {
        var @event = await Events.Include(e => e.TripEventLinks)
            .ThenInclude(e => e.Trip)
            .Include(e => e.Participants)
            .ThenInclude(e => e.User)
            .FirstOrDefaultAsync(e => e.Id.Equals(id));

        return _mapper.Map<EventDetailsModel>(@event);
    }

    public async Task<GetEventsPageModel> GetUserEvents(GetUserEventsParams @params, GetPageModel page)
    {
        var queryEvents = Events.Where(e => e.Display)
            .AsQueryable();

        queryEvents = @params.IsOwner
            ? queryEvents.Where(e => e.Participants.Exists(p =>
                p.UserId.Equals(@params.UserId)))
            : queryEvents.Where(e => e.Participants.Exists(p =>
                p.UserId.Equals(@params.UserId) && p.ParticipantRoleId.Equals(ParticipantRoleProfile.Owner)));

        return await GetEvents(queryEvents, @params, page);
    }

    public async Task UpdateImage(int eventId, IFormFile image)
    {
        var blobName = $"Event{eventId}_{DateTime.Now.ToFileTime()}_{image.FileName}";

        await _blobStorageGateway.UploadImageAsync(blobName, image);
    }

    public async Task<EventDetailsModel> CreateEvent(CreateEventModel model)
    {
        var @event = _mapper.Map<Event>(model);

        await _context.Events.AddAsync(@event);
        await _context.SaveChangesAsync();

        @event.Participants = new List<Participant>
        {
            new()
            {
                EventId = @event.Id,
                UserId = model.CreateUserId,
                ParticipantRoleId = ParticipantRoleProfile.Owner
            }
        };

        if (model.Trips != null || model.Participants != null)
        {
            @event.TripEventLinks = new List<TripEventLink>();
            model.Trips?.ForEach(id =>
            {
                @event.TripEventLinks.Add(new TripEventLink
                {
                    EventId = @event.Id,
                    TripId = id
                });
            });

            model.Participants?.ForEach(id =>
            {
                @event.Participants.Add(new Participant
                {
                    EventId = @event.Id,
                    UserId = id,
                    ParticipantRoleId = ParticipantRoleProfile.User
                });
            });
        }

        await _context.SaveChangesAsync();

        return await GetEvent(@event.Id);
    }

    public async Task DeleteEvent(int id)
    {
        var @event = await Events.FirstOrDefaultAsync(e => e.Id.Equals(id));

        if (@event == null)
        {
            return;
        }

        @event.Display = false;

        await _context.SaveChangesAsync();
    }

    public async Task<EventDetailsModel> UpdateEvent(UpdateEventModel model)
    {
        var @event = Events.Include(e => e.TripEventLinks)
            .FirstOrDefault(e => e.Id.Equals(model.Id));

        if (@event == null)
        {
            throw new Exception("Event not found");
        }

        _mapper.Map(model, @event);

        _context.Events.Update(@event);
        await _context.SaveChangesAsync();

        return await GetEvent(@event.Id);
    }

    private async Task<GetEventsPageModel> GetEvents(
        IQueryable<Event> queryEvents
        , GetDataParams @params
        , GetPageModel page
        , AccessibilityProfile? profile = null)
    {
        if (profile != null)
        {
            queryEvents = queryEvents.Where(e => profile.Equals(e.AccessibilityId));
        }

        if (!string.IsNullOrWhiteSpace(@params.SearchValue))
        {
            var value = @params.SearchValue.ToUpper();

            queryEvents = queryEvents.Where(e =>
                e.Title.ToUpper().Contains(value) || e.Description.ToUpper().Contains(value));
        }

        var count = await queryEvents.CountAsync();

        page.PageIndex = page.PageIndex <= 0 ? 1 : page.PageIndex;
        page.PageSize = page.PageSize <= 0 ? 5 : page.PageSize;

        var totalPages = (int)Math.Ceiling((double)count / page.PageSize);

        var index = page.PageIndex <= 1 ? 0 : page.PageIndex;

        var events = await queryEvents.Skip(index * page.PageSize)
            .Take(page.PageSize).ToListAsync();

        var eventsPage = new GetEventsPageModel
        {
            PageInfo = new PagingModel
            {
                PageIndex = page.PageIndex,
                PageSize = page.PageSize,
                TotalPages = totalPages
            },
            Events = _mapper.Map<IEnumerable<GetEventModel>>(events)
        };

        return eventsPage;
    }
}
