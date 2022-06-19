using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Enums;
using WorldAround.Domain.Models.Attractions;
using WorldAround.Domain.Models.Events;

namespace WorldAround.Application.Mapping;

public class AttractionsMappingProfile : Profile
{
    public AttractionsMappingProfile()
    {
        CreateMap<Attraction, GetAttractionModel>()
            .ForMember(d => d.Comments, o => o.MapFrom(s => s.Comments))
            .ForMember(d => d.ImagePath, o => o.MapFrom(s => s.Images.FirstOrDefault().ImagePath));

        CreateMap<Attraction, PlaceItem>()
            .ForMember(dest => dest.PlaceType, opts => opts.MapFrom((src) => PlaceType.Attraction));
    }
}
