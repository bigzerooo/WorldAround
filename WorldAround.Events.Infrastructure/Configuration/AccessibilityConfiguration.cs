using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class AccessibilityConfiguration : IEntityTypeConfiguration<Accessibility>
{
    public void Configure(EntityTypeBuilder<Accessibility> entity)
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Name).IsRequired();
    }
}
