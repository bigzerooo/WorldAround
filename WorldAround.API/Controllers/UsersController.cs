using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Models;

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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> Get(string userName, string email)
        {
            UserModel user;

            if (userName == null && email == null)
            {
                return Ok(await _usersService.GetAllAsync());
            }

            if (userName != null)
            {
                user = await _usersService.GetAsync(userName);
            }
            else
            {
                user = await _usersService.GetAsync(email);
            }

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
