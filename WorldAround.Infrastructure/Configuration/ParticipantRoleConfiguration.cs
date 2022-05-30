using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Configuration;

public class ParticipantRoleConfiguration : IEntityTypeConfiguration<ParticipantRole>
{
    public void Configure(EntityTypeBuilder<ParticipantRole> entity)
    {
        entity.HasKey(x => x.Id);

        entity.Property(x => x.Name)
            .HasMaxLength(30);
    }
}