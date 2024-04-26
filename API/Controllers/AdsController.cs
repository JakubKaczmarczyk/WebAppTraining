using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdsController : BaseApiController
{
    private readonly IAdRepository _adRepository;
    private readonly IMapper _mapper;

    public AdsController(IAdRepository adRepository, IMapper mapper)
    {
        _adRepository = adRepository;
        _mapper = mapper;
    }

    [HttpGet] // GET /api/ads
    public async Task<ActionResult<IEnumerable<AdDto>>> GetAds()
    {
        List<AdDto> ads = (List<AdDto>)await _adRepository.GetAdsAsync();
        return ads;
    }

    [HttpGet("id")] // GET /api/ads/2
    public async Task<ActionResult<AdDto>> GetAdd(string id)
    {
        int IntId;
        if (int.TryParse(id, out IntId))
        {
            return await _adRepository.GetAdAsync(IntId);
        }
        else
        {
            BadRequest("Failed to get add");
        }
    }

}
