using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface IUserService
{
    Task<UserModel> DeactivateAsync(int id);

    Task<IEnumerable<UserModel>> GetAllAsync();

    Task<UserModel> GetAsync(int id);

    Task<UserModel> GetAsync(string login);

    Task<UserModel> GetByNameAsync(string userName);

    Task<UserModel> UpdateAsync(UserModel UserModel);
}
