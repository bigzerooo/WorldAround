using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Models;

namespace WorldAround.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authService;
        private readonly IUserService _userService;
        private readonly IJwtTokenService _tokenService;

        public AuthenticationController(
            IAuthenticationService authService
            , IUserService userService
            , IJwtTokenService tokenService)
        {
            _authService = authService;
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<IActionResult> Authorize([FromBody] LoginModel loginModel)
        {
            var result = await _authService.AuthenticateAsync(loginModel);

            if (result.Succeeded)
            {
                var user = _userService.GetAsync(loginModel.Login);

                return Ok(new { Successful = true, Token = _tokenService.GenerateJwtAccessToken(user.Id.ToString()) });
            }

            return Ok(new { Successful = false, Token = string.Empty });
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
}
