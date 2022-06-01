using WorldAround.Domain.Models.Comments;

namespace WorldAround.Domain.Models.Trips;

public class GetTripsModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    public List<PinModel> Pins { get; set; }
    public List<CommentModel> Comments { get; set; }

    public DateTime CreateDate { get; set; }
}