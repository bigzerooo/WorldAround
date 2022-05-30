using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Configuration;

public class ParticipantConfiguration : IEntityTypeConfiguration<Participant>
{
    public void Configure(EntityTypeBuilder<Participant> entity)
    {
        entity.HasKey(p => new { p.UserId, p.EventId });

        entity.HasOne(p => p.Event)
            .WithMany(e => e.Participants)
            .HasForeignKey(p => p.EventId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(p => p.User)
            .WithMany(u => u.Participants)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(x => x.ParticipantRole)
            .WithMany(x => x.Participants)
            .HasForeignKey(x => x.ParticipantRoleId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
