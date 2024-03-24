using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("AdPhotos")]
public class AdPhoto
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool IsMain { get; set; }
    public string PublicId { get; set; }
    public int AdId { get; set; }
    public Ad Ad { get; set; }
}
