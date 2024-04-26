using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Extensions;

namespace API.Entities;

public class UserFavAds
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public AppUser User { get; set; }
    public int AppId { get; set; }
    public Ad Ad { get; set; }

}