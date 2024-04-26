﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities;

public class AppUser
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string UserName { get; set;}
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }

    public DateOnly DateOfBirth { get; set; }
    public string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public string Gender { get; set; }
    public string Introduction { get; set; }
    public string LookingFor { get; set; }
    public string Interests { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public List<UserPhoto> Photos { get; set; } = new List<UserPhoto>();
    public List<Ad> Ads { get; set; }
    public List<UserFavAds> FavAds { get; set; }
}
