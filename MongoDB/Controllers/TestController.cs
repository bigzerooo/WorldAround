using Microsoft.AspNetCore.Mvc;
using MongoDB.Interfaces.Services;
using MongoDB.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoDB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Test>>> GetAllTestsAsync()
        {
            try
            {
                return Ok(await _testService.GetAllTests());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Test>> GetTestByIdAsync(string id)
        {
            try
            {
                var test = await _testService.GetTestByIdAsync(id);

                return Ok(test);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateTestAsync(Test test)
        {
            try
            {
                await _testService.CreateTestAsync(test);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTestAsync(Test test, string id)
        {
            try
            {
                test.Id = new Bson.ObjectId(id);
                await _testService.UpdateTestAsync(test);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTestAsync(string id)
        {
            try
            {
                await _testService.DeleteTestByIdAsync(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
