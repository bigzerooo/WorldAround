using Microsoft.EntityFrameworkCore;
using WorldAround.Domain.Entities;

namespace WorldAround.Application.Interfaces.Infrastructure;

public interface IWorldAroundDbContext
{
    DbSet<Attraction> Attractions { get; set; }
    DbSet<Comment> Comments { get; set; }
    DbSet<Event> Events { get; set; }
    DbSet<Participant> Participants { get; set; }
    DbSet<ParticipantPermission> ParticipantsPermissions { get; set; }
    DbSet<ParticipantRole> ParticipantRoles { get; set; }
    DbSet<ParticipantRolePermissionLink> ParticipantRolePermissionLinks { get; set; }
    DbSet<Pin> Pins { get; set; }
    DbSet<Rating> Ratings { get; set; }
    DbSet<Trip> Trips { get; set; }
    DbSet<TripEventLink> TripEventLinks { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}