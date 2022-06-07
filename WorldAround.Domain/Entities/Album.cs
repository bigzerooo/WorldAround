namespace WorldAround.Domain.Entities;

public class Album
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int EventId { get; set; }

    public Event Event { get; set; }
    public IEnumerable<Image> Images { get; set; }
}
