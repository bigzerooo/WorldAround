using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;

namespace WorldAround.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _usersService.GetAllAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _usersService.GetAsync(id);

            return user != null ? Ok(user) : NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetByName(string userName)
        {
            var user = await _usersService.GetByNameAsync(userName);

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
