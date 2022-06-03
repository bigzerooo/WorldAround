using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;

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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string userName)
        {
            if (userName == null)
            {
                return Ok(await _usersService.GetAllAsync());
            }

            var user = await _usersService.GetAsync(userName);

            return user != null ? Ok(user) : NotFound();
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
