using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Models;

namespace WorldAround.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private readonly ITripsService _tripService;

        public TripsController(ITripsService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyCollection<GetTripsModel>>> GetTrips()
        {
            var trips = await _tripService.GetTrips();

            return Ok(trips);
        }
    }
}
