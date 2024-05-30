using System;
using API.Controllers;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<AppUser> Users { get; set; }
    public DbSet<Ad> Ads { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ad>()
        .HasOne(a => a.Author)
        .WithMany(u => u.Ads)
        .HasForeignKey(a => a.AppUserId);

        modelBuilder.Entity<AdFavorite>()
        .HasKey(af => new { af.AppUserId, af.AdId });

        modelBuilder.Entity<AdFavorite>()
        .HasOne(af => af.AppUser)
        .WithMany(u => u.FavAds)
        .HasForeignKey(af => af.AppUserId);

        modelBuilder.Entity<AdFavorite>()
        .HasOne(af => af.Ad)
        .WithMany(a => a.Favorites)
        .HasForeignKey(af => af.AdId);

    }
}
