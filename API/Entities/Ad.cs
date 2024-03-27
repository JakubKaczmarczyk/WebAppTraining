using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Extensions;

namespace API.Entities;

public class Ad
{
    [Key]
    public int Id { get; set; }
    [Required]
    public int AppUserId { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public string Description { get; set; }
    public List<AdPhoto> Photos { get; set; } = new List<AdPhoto>();
}
