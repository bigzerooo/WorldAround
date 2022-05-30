using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Domain.Entities;

namespace WorldAround.Infrastructure.Configuration;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> entity)
    {
        entity.HasKey(e => e.Id);

        entity.Property(x => x.Title)
            .HasMaxLength(50);

        entity.Property(x => x.Description)
            .HasMaxLength(2000);
    }
}