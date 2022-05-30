using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Configuration;

public class ParticipantRolePermissionLinkConfiguration : IEntityTypeConfiguration<ParticipantRolePermissionLink>
{
    public void Configure(EntityTypeBuilder<ParticipantRolePermissionLink> entity)
    {
        entity.HasKey(x => new { x.ParticipantPermissionId, x.ParticipantRoleId });

        entity.HasOne(x => x.ParticipantRole)
            .WithMany(x => x.ParticipantRolePermissionLinks)
            .HasForeignKey(x => x.ParticipantPermissionId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(x => x.ParticipantPermission)
            .WithMany(x => x.ParticipantRolePermissionLinks)
            .HasForeignKey(x => x.ParticipantPermissionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}