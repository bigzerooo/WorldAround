using WorldAround.Events.Domain.Enums;
using WorldAround.Events.Domain.Interfaces;

namespace WorldAround.Events.Domain.Entities;

public class ParticipantRole : IEntity<ParticipantRoleProfile>
{
    public ParticipantRoleProfile Id { get; set; }
    public string Name { get; set; }

    public IEnumerable<Participant> Participants { get; set; }
}
