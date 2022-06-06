using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class ParticipantPermissionConfiguration : IEntityTypeConfiguration<ParticipantPermission>
{
    public void Configure(EntityTypeBuilder<ParticipantPermission> entity)
    {
        entity.HasKey(e => e.Id);
    }
}
