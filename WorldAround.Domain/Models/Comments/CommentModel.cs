namespace WorldAround.Domain.Models.Comments;

public class CommentModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime CreateDate { get; set; }
    public string Text { get; set; }
}