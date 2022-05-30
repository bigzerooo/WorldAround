using WorldAround.Domain.Entities;

namespace WorldAround.Application.Interfaces.Application;

public interface IRoleService
{
    Task<IReadOnlyCollection<Role>> GetAllRolesAsync();

    Task CreateAsync(string name);

    Task DeleteAsync(int roleId);
}
