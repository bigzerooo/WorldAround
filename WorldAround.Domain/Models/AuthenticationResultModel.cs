using Microsoft.AspNetCore.Identity;

namespace WorldAround.Domain.Models;

public class AuthenticationResultModel
{
    public SignInResult Details { get; set; }

    public string Token { get; set; }
}
