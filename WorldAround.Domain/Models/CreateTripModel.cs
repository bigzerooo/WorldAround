namespace WorldAround.Domain.Models;

public class CreateTripModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    public List<PinModel> Pins { get; set; }
}