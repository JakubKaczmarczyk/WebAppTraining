

using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Comment
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string AuthorUsername { get; set; }
    public AppUser Author { get; set; }
    public int AdId { get; set; }
    public Ad OriginAd { get; set; }
    public string Text { get; set; }
}