using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class EquipmentGroup : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }

    public int EventId { get; set; }

    public Event Event { get; set; }
    public IEnumerable<Equipment> Equipments { get; set; }
}
