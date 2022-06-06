using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class EquipmentConfiguration : IEntityTypeConfiguration<Equipment>
{
    public void Configure(EntityTypeBuilder<Equipment> entity)
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Name);

        entity.HasOne(e => e.Event)
            .WithMany(e => e.Equipments)
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(e => e.EquipmentGroup)
            .WithMany(e => e.Equipments)
            .HasForeignKey(e => e.EquipmentGroupId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
