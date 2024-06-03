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
        return await _context.Ads.Include(p => p.Photos).Include(c => c.Comments).SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<AdDto>> GetAdsAsync()
    {
        return await _context.Ads
            .Include(a => a.Comments)
            .ProjectTo<AdDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }
    public async Task<IEnumerable<AdDto>> GetAdsByUserId(int id)
    {
        return await _context.Ads
            .Where(x => x.AppUserId == id)
            .Include(a => a.Comments)
            .ProjectTo<AdDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<AdDto> GetAdAsync(int id)
    {
        return await _context.Ads
               .Where(ad => ad.Id == id)
               .Include(a => a.Comments)
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
    }

    public void likeAd(AdDto ad, string username)
    {
        var user = _context.Users.Include(u => u.FavAds).FirstOrDefault(u => u.UserName == username);
        if (user == null)
        {
            throw new ArgumentException("User does not exist"); 
        }
        if (user.FavAds == null)
        {
            user.FavAds = new List<AdFavorite>(); // Initialize with an empty list
        }
        if (user.FavAds.Any(af => af.AdId == ad.Id))
        {
            // Already liked, so unlike
            user.FavAds.Remove(user.FavAds.FirstOrDefault(af => af.AdId == ad.Id));
        }
        else
        {
            // Not liked yet, so like it
            user.FavAds.Add(new AdFavorite { AppUserId = user.Id, AdId = ad.Id });
        }
    }

    public async Task<IEnumerable<AdDto>> GetFavAdsByUserId(int id)
    {
        // Include necessary entities using eager loading
        var user = await _context.Users
            .Include(u => u.FavAds)
            .ThenInclude(af => af.Ad)
            .ThenInclude(ad => ad.Comments)
            .Include(u => u.FavAds)
            .ThenInclude(af => af.Ad)
            .ThenInclude(ad => ad.Photos)
            .Where(u => u.Id == id)
            .FirstOrDefaultAsync();

        // Check if user exists
        if (user == null)
        {
            return null; // Or throw an appropriate exception
        }

        // Map favorite ads to AdDto objects
        var favAdsDto = user.FavAds.Select(af => _mapper.Map<AdDto>(af.Ad)).ToList();

        return favAdsDto;
    }
}
