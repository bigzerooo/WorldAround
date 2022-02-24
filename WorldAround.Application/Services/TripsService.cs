using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Services
{
    public class TripsService : ITripsService
    {
        private readonly IWorldAroundDbContext _context;
        private readonly IMapper _mapper;

        public TripsService(
            IWorldAroundDbContext context
            , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IReadOnlyCollection<GetTripsModel>> GetTrips()
        {
            var trips = await _context.Trips.ToListAsync();

            return _mapper.Map<IReadOnlyCollection<GetTripsModel>>(trips);
        }
    }
}
