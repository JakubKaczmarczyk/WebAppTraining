using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces;
public interface IAdRepository
{
    void Update(Ad ad);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<AdDto>> GetAdsAsync();
    Task<Ad> GetAdByIdAsync(int id);
    Task<IEnumerable<AdDto>> GetAdsByUserId(int id);
    Task<IEnumerable<AdDto>> GetFavAdsByUserId(int id);
    Task<AdDto> GetAdAsync(int id);
    void uploadAd(Ad ad);
    void likeAd(AdDto ad, string username);
    void DeleteAd(Ad ad);
}