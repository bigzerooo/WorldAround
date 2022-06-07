using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Models.Users;

namespace WorldAround.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Exists(string login)
        {
            var exists = await _usersService.Exists(login);

            return Ok(exists);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _usersService.GetAllAsync());
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetUser([FromQuery] GetUserParams @params)
        {
            var user = await _usersService.GetAsync(@params);

            return Ok(user);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _usersService.GetAsync(id);

            return user != null ? Ok(user) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddToRole(int userId, string role)
        {
            return Ok(await _usersService.AddToRoleAsync(userId, role));
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveFromRole(int userId, string role)
        {
            return Ok(await _usersService.AddToRoleAsync(userId, role));
        }
    }
}
