using Microsoft.EntityFrameworkCore;
using WorldAround.Domain.Entities;

namespace WorldAround.Application.Interfaces.Infrastructure;

public interface IWorldAroundDbContext
{
    DbSet<Trip> Trips { get; set; }
    DbSet<Pin> Pins { get; set; }
    DbSet<Attraction> Attractions { get; set; }
}