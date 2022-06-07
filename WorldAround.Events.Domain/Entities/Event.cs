using WorldAround.Events.Domain.Enums;
using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class Event : IEntity<int>
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool Display { get; set; }

    public AccessibilityProfile? AccessibilityId { get; set; }

    public Accessibility Accessibility { get; set; }

    public IEnumerable<Album> Albums { get; set; }
    public IEnumerable<Image> Images { get; set; }
    public IEnumerable<EquipmentGroup> EquipmentGroups { get; set; }
    public IEnumerable<Equipment> Equipments { get; set; }
    public IEnumerable<Chat> Chats { get; set; }
    public IEnumerable<Message> Messages { get; set; }
    public IEnumerable<Participant> Participants { get; set; }
    public IEnumerable<TripEventLink> TripEventLinks { get; set; }
}
