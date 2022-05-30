using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Models;

namespace WorldAround.API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authService;

    public AuthenticationController(
        IAuthenticationService authService
        , IUsersService usersService)
    {
        _authService = authService;
    }

    [HttpPost]
    public async Task<IActionResult> Authorize([FromBody] LoginModel loginModel)
    {
        var result = await _authService.AuthenticateAsync(loginModel);

        return result.Details.Succeeded ? Ok(result) : BadRequest(result.Details);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RegistrationModel registrationModel)
    {
        var result = await _authService.CreateAsync(registrationModel);

        return result.Succeeded ? Ok(result) : BadRequest(result.Errors);
    }

    [HttpGet]
    public async Task<IActionResult> Logout()
    {
        await _authService.SignOutAsync();

        return Ok();
    }
}
