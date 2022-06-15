using Microsoft.AspNetCore.Mvc;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Domain.Models.Comments;

namespace WorldAround.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommentsController:ControllerBase
{
    private readonly ICommentsService _commentsService;

    public CommentsController(ICommentsService commentsService)
    {
        _commentsService = commentsService;
    }

    [HttpPost]
    public async Task<ActionResult<CommentModel>> AddComment(AddCommentModel model)
    {
        var comment = await _commentsService.AddCommentAsync(model);

        return Ok(comment);
    }
}