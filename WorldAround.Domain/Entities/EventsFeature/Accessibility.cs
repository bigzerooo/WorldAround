using WorldAround.Domain.Interfaces;
using WorldAround.Domain.Enums;

namespace WorldAround.Domain.Entities;

public class Accessibility : IEntity<AccessibilityProfile>
{
    public AccessibilityProfile Id { get; set; }
    public string Name { get; set; }

    public IEnumerable<Event> Events { get; set; }
}
