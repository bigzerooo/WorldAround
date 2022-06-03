using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using FluentValidation.AspNetCore;
using WorldAround.Application.Helpers;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Application.Services;

namespace WorldAround.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddFluentValidation(c => c.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));
        services.AddScoped<ITripsService, TripsService>();
        services.AddScoped<IUsersService, UsersService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IRolesService, RolesService>();
        services.AddScoped<IJwtTokenHelper, JwtTokenHelper>();

        return services;
    }
}
