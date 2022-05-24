using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Infrastructure.Data;

namespace WorldAround.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("WorldAround");
            services.AddDbContext<WorldAroundDbContext>(options => options.UseSqlServer(connectionString));
            services.AddScoped<IWorldAroundDbContext, WorldAroundDbContext>();

            return services;
        }
    }
}
