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
    public int AppUserId { get; set; }
    public AppUser Author { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public string Title { get; set; }
    public string Description { get; set; }
    public string Street { get; set; }
    public string HomeNr { get; set; }
    public List<AdPhoto> Photos { get; set; } = new List<AdPhoto>();
    public List<AdFavorite> Favorites { get; set; }
    public List<Comment> Comments { get; set; }
}
