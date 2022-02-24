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

            return services;
        }
    }
}
