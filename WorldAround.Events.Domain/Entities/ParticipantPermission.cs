using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class ParticipantPermission : IEntity<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }

    public IEnumerable<ParticipantPermissionLink> ParticipantPermissionLinks { get; set; }
}
