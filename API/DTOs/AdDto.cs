using System;
using System.Collections.Generic;

namespace API.DTOs;
public class AdDto
{
    public int Id {get; set; }
    public int UserId {get; set; }
    public string PhotoUrl { get; set; }
    public DateTime Created { get; set; }
    public string Description { get; set; }
    public List<PhotoDto> Photos { get; set; }
}
