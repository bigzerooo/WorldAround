using Microsoft.AspNetCore.Identity;

namespace WorldAround.Domain.Entities;

public class User : IdentityUser<int>
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public bool IsActive { get; set; }
}
