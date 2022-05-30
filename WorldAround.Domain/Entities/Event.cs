namespace WorldAround.Domain.Entities;

public class Event
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreateDate { get; set; }

    public List<Participant> Participants { get; set; }
    public List<TripEventLink> TripEventLinks { get; set; }
    public List<Rating> Ratings { get; set; }
    public List<Comment> Comments { get; set; }
}
