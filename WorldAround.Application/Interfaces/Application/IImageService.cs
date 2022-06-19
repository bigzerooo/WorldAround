using WorldAround.Domain.Entities;
using WorldAround.Domain.Models.Images;

namespace WorldAround.Application.Interfaces.Application;

public interface IImageService
{
    public Task<ImageModel> Get(int id);

    public Task<ImageModel> Create(Image image);

    public Task Delete(int id);
}
