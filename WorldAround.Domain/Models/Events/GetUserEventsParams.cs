using WorldAround.Domain.Models.Base;

namespace WorldAround.Domain.Models.Events;

public class GetUserEventsParams : GetDataParams
{
    public int UserId { get; set; }

    public bool IsOwner { get; set; }
}
