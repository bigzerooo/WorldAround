using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class TripEventLinkConfiguration : IEntityTypeConfiguration<TripEventLink>
{
    public void Configure(EntityTypeBuilder<TripEventLink> entity)
    {
        entity.HasKey(e => new { e.TripId, e.EventId });

        entity.Property(e => e.TripId)
            .ValueGeneratedNever();

        entity.HasOne(e => e.Event)
            .WithMany(e => e.TripEventLinks)
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
