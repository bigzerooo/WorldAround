using System.Reflection;
using Microsoft.EntityFrameworkCore;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Data;

public class EventsContext : DbContext
{
    public DbSet<Accessibility> Accessibilities { get; set; }

    public DbSet<Album> Albums { get; set; }

    public DbSet<Chat> Chats { get; set; }

    public DbSet<Equipment> Equipments { get; set; }

    public DbSet<EquipmentGroup> EquipmentsGroups { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<Image> Images { get; set; }

    public DbSet<Message> Messages { get; set; }

    public DbSet<Participant> Participants { get; set; }

    public DbSet<ParticipantPermission> ParticipantsPermissions { get; set; }

    public DbSet<ParticipantPermissionLink> ParticipantPermissionLinks { get; set; }

    public DbSet<ParticipantRole> ParticipantRoles { get; set; }

    public DbSet<TripEventLink> TripEventLinks { get; set; }

    public EventsContext(DbContextOptions<EventsContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
