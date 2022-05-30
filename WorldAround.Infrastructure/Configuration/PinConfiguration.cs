using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Configuration
{
    public class PinConfiguration : IEntityTypeConfiguration<Pin>
    {
        public void Configure(EntityTypeBuilder<Pin> builder)
        {
            builder.HasKey(p => p.Id);

            builder.HasOne(p => p.Trip)
                .WithMany(t => t.Pins)
                .HasForeignKey(p => p.TripId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.Attraction)
                .WithMany(a => a.Pins)
                .HasForeignKey(p => p.AttractionId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
