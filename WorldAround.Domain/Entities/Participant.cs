using WorldAround.Domain.Enums;

namespace WorldAround.Domain.Entities;

public class Participant
{
    public int UserId { get; set; }
    public int EventId { get; set; }
    public ParticipantRole ParticipantRole { get; set; }
}