using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class ImageConfiguration : IEntityTypeConfiguration<Image>
{
    public void Configure(EntityTypeBuilder<Image> entity)
    {
        entity.HasKey(x => x.Id);

        entity.HasOne(e => e.Event)
            .WithMany(e => e.Images)
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(e => e.Album)
            .WithMany(e => e.Images)
            .HasForeignKey(e => e.AlbumId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
