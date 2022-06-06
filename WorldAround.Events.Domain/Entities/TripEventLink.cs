namespace WorldAround.Events.Domain.Entities;

public class TripEventLink
{
    public int TripId { get; set; }
    public int EventId { get; set; }

    public Event Event { get; set; }
}
