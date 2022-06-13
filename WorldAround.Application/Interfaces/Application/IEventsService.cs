using Microsoft.AspNetCore.Http;
using WorldAround.Domain.Models.Base;
using WorldAround.Domain.Models.Events;
using WorldAround.Domain.Models.Paging;

namespace WorldAround.Application.Interfaces.Application;

public interface IEventsService
{
    public Task<GetEventsPageModel> GetEvents(GetDataParams @params, GetPageModel page);

    public Task<EventDetailsModel> GetEvent(int id);

    public Task<GetEventsPageModel> GetUserEvents(GetUserEventsParams @params, GetPageModel page);

    public Task UpdateImage(int eventId, IFormFile image);

    public Task<EventDetailsModel> CreateEvent(CreateEventModel model);

    public Task DeleteEvent(int id);

    public Task<EventDetailsModel> UpdateEvent(UpdateEventModel model);
}
