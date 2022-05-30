namespace WorldAround.Domain.Entities;

public class ParticipantRolePermissionLink
{
    public int ParticipantRoleId { get; set; }
    public int ParticipantPermissionId { get; set; }

    public ParticipantPermission ParticipantPermission { get; set; }
    public ParticipantRole ParticipantRole { get; set; }
}
