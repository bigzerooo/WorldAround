using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models.Comments;
using WorldAround.Domain.Models.Trips;

namespace WorldAround.Application.Services;

public class TripsService : ITripsService
{
    private readonly IWorldAroundDbContext _context;
    private readonly IMapper _mapper;

    public TripsService(
        IWorldAroundDbContext context
        , IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<GetTripsModel> GetTripAsync(int tripId)
    {
        var trip = await _context.Trips
            .Include(x => x.Pins)
            .Include(x => x.Comments)
            .ThenInclude(x => x.Author)
            .FirstOrDefaultAsync(x => x.Id == tripId);

        return _mapper.Map<GetTripsModel>(trip);
    }

    public async Task<IReadOnlyCollection<GetTripsModel>> GetTripsAsync(int userId)
    {
        var trips = await _context.Trips
            .Where(x => x.AuthorId == userId)
            .Include(x => x.Pins)
            .ToListAsync();

        return _mapper.Map<IReadOnlyCollection<GetTripsModel>>(trips);
    }

    public async Task<IReadOnlyCollection<GetTripsModel>> SearchTripsAsync(string searchValue)
    {
        var trips = await _context.Trips
            .Where(x => x.Name.ToLower().Contains(searchValue.ToLower())
                        || x.Description.ToLower().Contains(searchValue.ToLower()))
            .ToListAsync();

        return _mapper.Map<IReadOnlyCollection<GetTripsModel>>(trips);
    }

    public async Task CreateTripAsync(CreateTripModel model)
    {
        var trip = new Trip
        {
            Name = model.Name,
            Description = model.Description,
            AuthorId = model.AuthorId,
            CreateDate = DateTime.Now,
            Pins = model.Pins.Select(x => new Pin
            {
                Name = x.Name,
                Description = x.Description,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
                SequenceNumber = x.SeqNo
            }).ToList()
        };

        _context.Trips.Add(trip);
        await _context.SaveChangesAsync();
    }

    public async Task<CommentModel> AddCommentAsync(AddCommentModel model)
    {
        var comment = new Comment
        {
            AuthorId = model.UserId,
            CreateDate = DateTime.Now,
            Text = model.Text,
            TripId = model.TargetId
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        var createdComment = await _context.Comments
            .Include(x => x.Author)
            .FirstOrDefaultAsync(x => x.Id == comment.Id);

        return _mapper.Map<CommentModel>(createdComment);
    }

    public async Task DeleteTripAsync(int tripId)
    {
        var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);

        if (trip != null)
        {
            _context.Trips.Remove(trip);
            await _context.SaveChangesAsync();
        }
    }
}