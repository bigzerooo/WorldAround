using WorldAround.Domain.Enums;
using WorldAround.Domain.Interfaces;

namespace WorldAround.Domain.Entities;

public class Participant : IEntity<int>
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public int EventId { get; set; }
    public ParticipantRoleProfile? ParticipantRoleId { get; set; }

    public User User { get; set; }
    public Event Event { get; set; }
    public ParticipantRole ParticipantRole { get; set; }

    public IEnumerable<ParticipantPermissionLink> ParticipantPermissionLinks { get; set; }
}
