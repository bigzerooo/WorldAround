using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class ParticipantRoleConfiguration : IEntityTypeConfiguration<ParticipantRole>
{
    public void Configure(EntityTypeBuilder<ParticipantRole> entity)
    {
        entity.HasKey(e => e.Id);

        entity.Property(e => e.Id)
            .ValueGeneratedNever();

        entity.Property(e => e.Name)
            .IsRequired();
    }
}
