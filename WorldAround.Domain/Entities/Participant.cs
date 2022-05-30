namespace WorldAround.Domain.Entities;

public class Participant
{
    public int UserId { get; set; }
    public int EventId { get; set; }
    public int ParticipantRoleId { get; set; }

    public User User { get; set; }
    public Event Event { get; set; }
    public ParticipantRole ParticipantRole { get; set; }
}
