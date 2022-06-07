using WorldAround.Events.Domain.Enums;
using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class Participant : IEntity<int>
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public int EventId { get; set; }
    public ParticipantRoleProfile? ParticipantRoleId { get; set; }

    public Event Event { get; set; }
    public ParticipantRole ParticipantRole { get; set; }

    public IEnumerable<ParticipantPermissionLink> ParticipantPermissionLinks { get; set; }
}
