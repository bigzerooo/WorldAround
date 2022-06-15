using WorldAround.Domain.Enums;

namespace WorldAround.Domain.Models.Comments;

public class AddCommentModel
{
    public string Text { get; set; }
    public int UserId { get; set; }

    public int TargetId { get; set; }
    public TargetType TargetType { get; set; }
}