using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AdRepository : IAdRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public AdRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Ad> GetAdByIdAsync(int id)
    {
        return await _context.Ads.FindAsync(id);
    }

    public async Task<IEnumerable<AdDto>> GetAdsAsync()
    {
        return await _context.Ads
            .ProjectTo<AdDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
    public async Task<IEnumerable<AdDto>> GetAdsByUserId(int id)
    {
        return await _context.Ads
            // .Where(x => x.AppUserId == id)
            .ProjectTo<AdDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<AdDto> GetAdAsync(int id)
    {
        return await _context.Ads
               .Where(ad => ad.Id == id)
               .ProjectTo<AdDto>(_mapper.ConfigurationProvider)
               .SingleOrDefaultAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(Ad ad)
    {
        _context.Entry(ad).State = EntityState.Modified;
    }

    public void uploadAd(Ad ad)
    {
        _context.Add(ad);
        _context.SaveChanges();
    }
}
