using AutoMapper;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Mapping;

public class TripsMappingProfile : Profile
{
    public TripsMappingProfile()
    {
        CreateMap<Trip, GetTripsModel>()
            .ForMember(d => d.Pins, o => o.MapFrom(s => s.Pins))
            .ForMember(d => d.Comments, o => o.MapFrom(s => s.Comments))
            ;

        CreateMap<PinModel, Pin>()
            .ForMember(d => d.Id, o => o.Ignore())
            .ForMember(d => d.SequenceNumber, o => o.MapFrom(s => s.SeqNo))
            ;

        CreateMap<Pin, PinModel>()
            .ForMember(d => d.SeqNo, o => o.MapFrom(s => s.SequenceNumber))
            ;

        CreateMap<Comment, CommentModel>()
            .ForMember(d => d.FirstName, o => o.MapFrom(s => s.Author.FirstName))
            .ForMember(d => d.LastName, o => o.MapFrom(s => s.Author.LastName))
            ;
    }
}
