using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface IUsersService
{
    Task<IList<string>> AddToRoleAsync(int userId, string role);

    Task<IList<string>> RemoveFromRoleAsync(int userId, string role);

    Task<UserModel> DeactivateAsync(int id);

    Task<IReadOnlyCollection<UserModel>> GetAllAsync();

    Task<UserModel> GetAsync(int id);

    Task<UserModel> GetAsync(string userName);

    Task<UserModel> UpdateAsync(UserModel userModel);
}
