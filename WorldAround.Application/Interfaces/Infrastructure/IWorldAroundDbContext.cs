using Microsoft.EntityFrameworkCore;
using WorldAround.Domain.Entities;

namespace WorldAround.Application.Interfaces.Infrastructure;

public interface IWorldAroundDbContext
{
    DbSet<Attraction> Attractions { get; set; }
    DbSet<Event> Events { get; set; }
    DbSet<Participant> Participants { get; set; }
    DbSet<Pin> Pins { get; set; }
    DbSet<Trip> Trips { get; set; }
}
