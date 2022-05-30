using AutoMapper;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Mapping;

public class UserMappingProfile : Profile
{
    public UserMappingProfile()
    {
        CreateMap<RegistrationModel, User>();
        CreateMap<LoginModel, User>();
        CreateMap<UserModel, User>()
            .ReverseMap();
    }
}
