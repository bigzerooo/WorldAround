using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WorldAround.Application.Interfaces.Application;
using WorldAround.Application.Interfaces.Infrastructure;
using WorldAround.Domain.Entities;
using WorldAround.Domain.Enums;
using WorldAround.Domain.Models.Comments;

namespace WorldAround.Application.Services;

public class CommentsService: ICommentsService
{
    private readonly IWorldAroundDbContext _context;
    private readonly IMapper _mapper;

    public CommentsService(
        IWorldAroundDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CommentModel> AddCommentAsync(AddCommentModel model)
    {
        var comment = new Comment
        {
            AuthorId = model.UserId,
            CreateDate = DateTime.Now,
            Text = model.Text
        };

        switch (model.TargetType)
        {
            case TargetType.Trip:
                comment.TripId = model.TargetId;
                break;
            case TargetType.Attraction:
                comment.AttractionId = model.TargetId;
                break;
        }

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        var createdComment = await _context.Comments
            .Include(x => x.Author)
            .FirstOrDefaultAsync(x => x.Id == comment.Id);

        return _mapper.Map<CommentModel>(createdComment);
    }
}