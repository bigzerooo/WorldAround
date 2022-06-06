using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class ParticipantConfiguration : IEntityTypeConfiguration<Participant>
{
    public void Configure(EntityTypeBuilder<Participant> entity)
    {
        entity.HasKey(e => e.Id);

        entity.HasIndex(e => new { e.UserId, e.EventId })
            .IsUnique();

        entity.Property(e => e.UserId).ValueGeneratedNever();

        entity.HasOne(e => e.ParticipantRole)
            .WithMany(e => e.Participants)
            .HasForeignKey(e => e.ParticipantRoleId)
            .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(e => e.Event)
            .WithMany(e => e.Participants)
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
