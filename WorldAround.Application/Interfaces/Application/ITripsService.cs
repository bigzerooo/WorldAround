using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface ITripsService
{
    Task<IReadOnlyCollection<GetTripsModel>> GetTrips();
}