using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces;
public interface IAdRepository
{
    void Update(Ad ad);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Ad>> GetAdsAsync();
    Task<Ad> GetAdByIdAsync(int id);
}