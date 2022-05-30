namespace WorldAround.Domain.Entities;

public class ParticipantPermission
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Descripsion { get; set; }

    public List<ParticipantRolePermissionLink> ParticipantRolePermissionLinks { get; set; }
}
