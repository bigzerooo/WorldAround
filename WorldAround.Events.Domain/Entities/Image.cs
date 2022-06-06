using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class Image : IEntity<int>
{
    public int Id { get; set; }
    public string? FilePath { get; set; }

    public int EventId { get; set; }
    public int? AlbumId { get; set; }

    public Event Event { get; set; }
    public Album Album { get; set; }
}
