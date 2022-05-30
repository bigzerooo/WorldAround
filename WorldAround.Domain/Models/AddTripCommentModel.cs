namespace WorldAround.Domain.Models;

public class AddTripCommentModel
{
    public string Text { get; set; }
    public int UserId { get; set; }
    public int TripId { get; set; }
}