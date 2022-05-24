using WorldAround.Domain.Entities.Base;

namespace WorldAround.Domain.Entities;

public class Attraction : Point 
{
    public int Id { get; set; }

    public List<Pin> Pins { get; set; }
}