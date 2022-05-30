using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;

namespace WorldAround.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _userService.GetAllAsync());
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var user = await _userService.GetAsync(id);

            return user != null ? Ok(user) : NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetByName(string userName)
        {
            var user = await _userService.GetByNameAsync(userName);

            return user != null ? Ok(user) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddToRole(int userId, string role)
        {
            return Ok(await _userService.AddToRoleAsync(userId, role));
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveFromRole(int userId, string role)
        {
            return Ok(await _userService.AddToRoleAsync(userId, role));
        }
    }
}
