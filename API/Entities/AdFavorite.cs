using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Extensions;

namespace API.Entities;

public class AdFavorite
{
  [Key]
  public int Id { get; set; }

  public int AppUserId { get; set; }
  public AppUser AppUser { get; set; }

  public int AdId { get; set; }
  public Ad Ad { get; set; }
}