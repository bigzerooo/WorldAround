using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class EquipmentGroupConfiguration : IEntityTypeConfiguration<EquipmentGroup>
{
    public void Configure(EntityTypeBuilder<EquipmentGroup> entity)
    {
        entity.HasKey(e => e.Id);

        entity.HasOne(e => e.Event)
            .WithMany(e => e.EquipmentGroups)
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
