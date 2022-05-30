using AutoMapper;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Mapping;

public class TripsMappingProfile : Profile
{
    public TripsMappingProfile()
    {
        CreateMap<Trip, GetTripsModel>();
    }
}
