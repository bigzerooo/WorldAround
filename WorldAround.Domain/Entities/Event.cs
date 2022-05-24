namespace WorldAround.Domain.Entities;

public class Event
{
    public int Id { get; set; }
    public int TripId { get; set; }

    public List<Participant> Participants { get; set; }
    public Trip Trip { get; set; }
}