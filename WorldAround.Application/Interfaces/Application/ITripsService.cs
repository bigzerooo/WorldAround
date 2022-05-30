using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface ITripsService
{
    Task<GetTripsModel> GetTripAsync(int tripId);
    Task<IReadOnlyCollection<GetTripsModel>> GetTripsAsync(int userId);
    Task<IReadOnlyCollection<GetTripsModel>> SearchTripsAsync(string searchValue);
    Task CreateTripAsync(CreateTripModel model);
    Task<CommentModel> AddCommentAsync(AddTripCommentModel model);
}