using WorldAround.Events.Domain.Enums;
using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class Accessibility : IEntity<AccessibilityProfile>
{
    public AccessibilityProfile Id { get; set; }
    public string Name { get; set; }

    public IEnumerable<Event> Events { get; set; }
}
