using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> entity)
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Title).IsRequired();

        entity.HasOne(e => e.Accessibility)
            .WithMany(e => e.Events)
            .HasForeignKey(e => e.AccessibilityId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
