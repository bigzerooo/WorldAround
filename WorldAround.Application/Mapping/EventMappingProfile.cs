using AutoMapper;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models.Events;

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
        CreateMap<Event, EventDetailsModel>();
    }
}
