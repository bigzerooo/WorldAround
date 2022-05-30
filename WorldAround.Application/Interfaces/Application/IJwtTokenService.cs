using WorldAround.Domain.Models;

namespace WorldAround.Application.Interfaces.Application;

public interface IJwtTokenService
{
    string GenerateJwtAccessToken(string userId);

    string GenerateJwtIdToken(UserModel user);
}
