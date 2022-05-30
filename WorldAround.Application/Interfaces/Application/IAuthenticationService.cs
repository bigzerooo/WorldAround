using Microsoft.AspNetCore.Identity;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface IAuthenticationService
{
    Task<SignInResult> AuthenticateAsync(LoginModel loginModel);

    Task<IdentityResult> CreateAsync(RegistrationModel registrationModel);

    Task SignOutAsync();
}
