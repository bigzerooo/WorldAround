using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Models;

namespace WorldAround.Application.Services;

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

    public async Task<IReadOnlyCollection<GetTripsModel>> GetTrips(int userId)
    {
        var trips = await _context.Trips
            .Where(x => x.AuthorId == userId)
            .Include(x => x.Pins)
            .ToListAsync();

        return _mapper.Map<IReadOnlyCollection<GetTripsModel>>(trips);
    }

    public async Task CreateTrip(CreateTripModel model)
    {
        var trip = new Trip
        {
            Name = model.Name,
            Description = model.Description,
            //Add author id,
            CreateDate = DateTime.Now,
            Pins = model.Pins.Select(x => new Pin
            {
                Name = x.Name,
                Description = x.Description,
                Latitude = x.Latitude,
                Longitude = x.Longitude,
                SequenceNumber = x.SeqNo
            }).ToList()
        };

        _context.Trips.Add(trip);
        await _context.SaveChangesAsync();
    }
}