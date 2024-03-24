using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdsController : BaseApiController
{
    private readonly IAdRepository _AdRepository;
    private readonly IMapper _mapper;

    [HttpGet] // GET /api/ads
    public async Task<ActionResult<IEnumerable<Ad>>> GetAds()
    {
        List<Ad> ads = (List<Ad>)await _AdRepository.GetAdsAsync();
        return ads;
    }

}
