using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Configuration;

public class TripEventLinkConfiguration : IEntityTypeConfiguration<TripEventLink>
{
    public void Configure(EntityTypeBuilder<TripEventLink> entity)
    {
        entity.HasKey(x => new { x.TripId, x.EventId });

        entity.HasOne(x => x.Trip)
            .WithMany(x => x.TripEventLinks)
            .HasForeignKey(x => x.TripId)
            .OnDelete(DeleteBehavior.Restrict);

        entity.HasOne(x => x.Event)
            .WithMany(x => x.TripEventLinks)
            .HasForeignKey(x => x.EventId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}