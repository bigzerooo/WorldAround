﻿namespace WorldAround.Domain.Entities;

public class Comment
{
    public int Id { get; set; }
    public int AuthorId { get; set; }
    public DateTime CreateDate { get; set; }
    public string Text { get; set; }

    public int? TripId { get; set; }
    public int? EventId { get; set; }
    public int? AttractionId { get; set; }
    public int? UserId { get; set; }

    public Trip Trip { get; set; }
    public Event Event { get; set; }
    public Attraction Attraction { get; set; }
    public User User { get; set; }
}