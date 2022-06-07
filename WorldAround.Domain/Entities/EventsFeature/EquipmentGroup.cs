namespace WorldAround.Domain.Entities;

public class EquipmentGroup
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int EventId { get; set; }

    public Event Event { get; set; }
    public IEnumerable<Equipment> Equipments { get; set; }
}
