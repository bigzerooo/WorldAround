using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Data
{
    public class WorldAroundDbContext : DbContext, IWorldAroundDbContext
    {
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Pin> Pins { get; set; }

        public WorldAroundDbContext(DbContextOptions<WorldAroundDbContext> options)
            : base(options)
        {
        }
    }
}
