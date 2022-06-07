using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WorldAround.Events.Infrastructure.Data;

namespace WorldAround.Events.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Events");

            services.AddDbContext<EventsContext>(options => options.UseSqlServer(connectionString));

            return services;
        }
    }
}
