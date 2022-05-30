using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface ITripsService
{
    Task<IReadOnlyCollection<GetTripsModel>> GetTrips(int userId);
    Task CreateTrip(CreateTripModel model);
}