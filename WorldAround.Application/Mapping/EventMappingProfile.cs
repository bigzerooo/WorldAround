using AutoMapper;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models.Events;
using WorldAround.Domain.Models.Trips;

namespace WorldAround.Application.Mapping;

public class EventMappingProfile : Profile
{
    public EventMappingProfile()
    {
        CreateMap<CreateEventModel, Event>()
            .ForMember(dest => dest.Accessibility, opts => opts.Ignore())
            .ForMember(dest => dest.AccessibilityId, opts =>
            {
                opts.MapFrom(src => src.Accessibility);
                opts.Condition(m => m.Accessibility != 0);
            });
        CreateMap<Event, CreateEventModel>()
            .ForMember(dest => dest.Accessibility, opts => opts.MapFrom(src => src.AccessibilityId));

        CreateMap<UpdateEventModel, Event>()
            .ForMember(dest => dest.TripEventLinks, opts => opts.ConvertUsing(new UpdateEventModelValueFormatter(), src => src))
            .ForMember(dest => dest.StartDate, opts => opts.Condition(src => src.StartDate != null))
            .ForMember(dest => dest.EndDate, opts => opts.Condition(src => src.EndDate != null))
            .ForMember(dest => dest.Title, opts => opts.Condition(src => src.Title != null))
            .ForMember(dest => dest.Description, opts => opts.Condition(src => src.Description != null))
            .ForMember(dest => dest.Accessibility, opts => opts.Ignore())
            .ForMember(dest => dest.AccessibilityId, opts =>
            {
                opts.Condition(m => m.Accessibility != null);
                opts.MapFrom(src => src.Accessibility);
            });

        CreateMap<Event, GetEventModel>();
        CreateMap<Event, EventDetailsModel>()
            .ForMember(dest => dest.Trips, opts => opts.ConvertUsing(new GetEventModelValueFormatter(), src => src));
    }

    public class GetEventModelValueFormatter : IValueConverter<Event, GetTripsModel>
    {
        private readonly IMapper _mapper;

        public GetEventModelValueFormatter()
        {
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TripsMappingProfile>();
            }).CreateMapper();
        }

        public GetTripsModel Convert(Event source, ResolutionContext context)
        {
            var model = new GetTripsModel();
            var trips = new List<Trip>();

            source.TripEventLinks.ForEach(link =>
            {
                trips.Add(link?.Trip);
            });

            model.Data = _mapper.Map<IReadOnlyCollection<TripModel>>(trips);
            model.Length = model.Data.Count;

            return model;
        }
    }

    public class UpdateEventModelValueFormatter : IValueConverter<UpdateEventModel, List<TripEventLink>>
    {
        public List<TripEventLink> Convert(UpdateEventModel source, ResolutionContext context)
        {
            var tripEventLinks = new List<TripEventLink>();

            source.TripIds.ForEach(tripId =>
            {
                tripEventLinks.Add(new TripEventLink { EventId = source.Id, TripId = tripId });
            });

            return tripEventLinks;
        }
    }
}
