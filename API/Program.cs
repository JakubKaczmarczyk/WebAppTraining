using Microsoft.AspNetCore.Builder;
using API.Extensions;
using Microsoft.Extensions.DependencyInjection;
using API.Middleware;
using API.Data;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);

var cloudinarySettings = new
{
    ApiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY"),
    ApiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET"),
    CloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME")
};

// Configure Kestrel to listen on all network interfaces and specific ports
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000); // HTTP
    options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps("/app/ssl/localhost.pfx")); // HTTPS
});

// Add services
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddSingleton(cloudinarySettings);

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://localhost:4200", "http://client:4200") // Upewnij się, że "client" to nazwa usługi frontendu
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middleware
app.UseMiddleware<ExceptionMiddleware>();

// Enable CORS
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Database migration and seeding
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
