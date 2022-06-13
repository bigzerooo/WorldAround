using WorldAround.Domain.Models;
using WorldAround.Domain.Models.Users;

namespace WorldAround.Application.Interfaces.Application;

public interface IUsersService
{
    Task<IList<string>> AddToRoleAsync(int userId, string role);

    Task<IList<string>> RemoveFromRoleAsync(int userId, string role);

    Task<UserModel> DeactivateAsync(int id);

    Task<IReadOnlyCollection<UserModel>> GetAllAsync();

    Task<UserModel> GetAsync(int id);

    Task<UserModel> GetAsync(GetUserParams @params);

    Task<bool> Exists(string login);

    Task<bool> CheckPassword(int userId, string password);

    Task UpdatePasswordAsync(UpdateUserPasswordParameters parameters);

    Task<UserModel> UpdateAsync(UserModel userModel);
}
