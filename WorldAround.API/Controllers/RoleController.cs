using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;

namespace WorldAround.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _roleService.GetAllRolesAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(string name)
        {
            await _roleService.CreateAsync(name);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await _roleService.DeleteAsync(id);
            return Ok();
        }
    }
}
