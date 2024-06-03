namespace API.DTOs;
public class CommentDto
{
    public int Id { get; set;}
    public int AppUserId { get; set; }
    public int AdId { get; set; }
    public string Text { get; set; }
}