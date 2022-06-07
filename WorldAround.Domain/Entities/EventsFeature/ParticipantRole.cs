using WorldAround.Domain.Enums;
using WorldAround.Domain.Interfaces;

namespace WorldAround.Domain.Entities;

public class ParticipantRole : IEntity<ParticipantRoleProfile>
{
    public ParticipantRoleProfile Id { get; set; }
    public string Name { get; set; }

    public IEnumerable<Participant> Participants { get; set; }
}
