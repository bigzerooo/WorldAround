using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorldAround.Events.Domain.Entities;

namespace WorldAround.Events.Infrastructure.Configuration;

public class ChatConfiguration : IEntityTypeConfiguration<Chat>
{
    public void Configure(EntityTypeBuilder<Chat> entity)
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Name).IsRequired();

        entity.HasOne(e => e.Event)
            .WithMany(e => e.Chats)
            .HasForeignKey(e => e.EventId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
