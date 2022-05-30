using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface ITripService
{
    Task<IReadOnlyCollection<GetTripsModel>> GetTrips();
    Task CreateTrip(CreateTripModel model);
}