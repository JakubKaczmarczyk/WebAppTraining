namespace API.DTOs;
public class CommentDto
{
    public int Id { get; set;}
    public string AuthorUsername { get; set; }
    public int AdId { get; set; }
    public string Text { get; set; }
}