using WorldAround.Domain.Models.Comments;

namespace WorldAround.Application.Interfaces.Application
{
    public interface ICommentsService
    {
        Task<CommentModel> AddCommentAsync(AddCommentModel model);
    }
}
