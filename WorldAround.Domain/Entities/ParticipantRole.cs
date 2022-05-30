namespace WorldAround.Domain.Entities;

public class ParticipantRole
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<Participant> Participants { get; set; }
    public List<ParticipantRolePermissionLink> ParticipantRolePermissionLinks { get; set; }
}
