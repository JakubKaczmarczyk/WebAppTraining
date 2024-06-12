using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;
public class AdDto
{
    public int Id {get; set; }
    public int UserId {get; set; }
    public string PhotoUrl { get; set; }
    public DateTime Created { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Street { get; set; }
    public string HomeNr { get; set; }
    public string PhoneNr { get; set; }
    public List<PhotoDto> Photos { get; set; }
    public List<CommentDto> Comments { get; set; }
}
