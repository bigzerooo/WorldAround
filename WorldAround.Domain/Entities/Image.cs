﻿using WorldAround.Domain.Interfaces;

namespace WorldAround.Domain.Entities;

public class Image : IEntity<int>
{
    public int Id { get; set; }
    public string? FilePath { get; set; }

    public int? EventId { get; set; }
    public int? TripId { get; set; }
    public int? AttractionId { get; set; }
    public int? PinId { get; set; }
    public int? AlbumId { get; set; }

    public Event Event { get; set; }
    public Trip Trip { get; set; }
    public Attraction Attraction { get; set; }
    public Pin Pin { get; set; }
    public Album Album { get; set; }
}
