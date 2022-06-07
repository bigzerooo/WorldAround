using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> entity)
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Title)
            .IsRequired();

        entity.Property(e => e.Display)
            .IsRequired(false)
            .HasDefaultValue(true);

        entity.HasOne(e => e.Accessibility)
            .WithMany(e => e.Events)
            .HasForeignKey(e => e.AccessibilityId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
