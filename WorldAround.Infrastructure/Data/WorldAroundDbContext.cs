using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Data;

public class WorldAroundDbContext : IdentityDbContext<User, IdentityRole<int>, int>, IWorldAroundDbContext
{
    public DbSet<Attraction> Attractions { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<Pin> Pins { get; set; }
    public DbSet<Trip> Trips { get; set; }

    public WorldAroundDbContext(DbContextOptions<WorldAroundDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(modelBuilder);
    }
}
