using Microsoft.AspNetCore.Identity;

namespace WorldAround.Domain.Entities;

public class User : IdentityUser<int>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsActive { get; set; }

    public List<Trip> CreatedTrips { get; set; }
    public List<Participant> Participants { get; set; }
}
