using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Application.Services;

namespace WorldAround.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<ITripsService, TripsService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IJwtTokenService, JwtTokenService>();

            return services;
        }
    }
}
