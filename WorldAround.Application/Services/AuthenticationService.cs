using AutoMapper;
using Microsoft.AspNetCore.Identity;
using WorldAround.Application.Helpers;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AuthenticationService(
        IMapper mapper
        , UserManager<User> userManager
        , SignInManager<User> signInManager)
    {
        _mapper = mapper;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<SignInResult> AuthenticateAsync(LoginModel loginModel)
    {
        var login = loginModel.Login;
        var user = UserHelper.IsEmail(login) ?
                await _userManager.FindByEmailAsync(login)
                : await _userManager.FindByNameAsync(login);

        if (user == null)
            throw new NullReferenceException("A user with specified login not found");

        var result = await _signInManager.PasswordSignInAsync(user, loginModel.Password, loginModel.RememberMe, false);

        return result;
    }

    public async Task<IdentityResult> CreateAsync(RegistrationModel registrationModel)
    {
        var user = _mapper.Map<User>(registrationModel);

        var result = await _userManager.CreateAsync(user, registrationModel.Password);

        if (result.Succeeded)
        {
            await _signInManager.SignInAsync(user, false);
        }

        return result;
    }

    public async Task SignOutAsync()
    {
        await _signInManager.SignOutAsync();
    }
}
