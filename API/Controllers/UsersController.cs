using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IAdRepository _adRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUserRepository userRepository, IAdRepository adRepository, IMapper mapper, IPhotoService photoService)
    {
        _userRepository = userRepository;
        _adRepository = adRepository;
        _mapper = mapper;
        _photoService = photoService;
    }

    [HttpGet] // GET /api/users
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        List<MemberDto> users = (List<MemberDto>)await _userRepository.GetMembersAsync();
        return users;
    }

    [HttpGet("{username}")] // GET /api/users/2
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        if (int.TryParse(username, out int userId))
        {
            return await _userRepository.GetMemberByIdAsync(userId);
        }
        else
        {
            return await _userRepository.GetMemberAsync(username);
        }
    }

    [HttpGet("{userId}/ads")] // GET /api/users/1/ads
    public async Task<ActionResult<IEnumerable<AdDto>>> GetAddsByUsername(string userId)
    {
        int IntuserId;
        if (int.TryParse(userId, out IntuserId))
        {
            List<AdDto> ads = (List<AdDto>)await _adRepository.GetAdsByUserId(IntuserId);
            return ads;
        }
        else
        {
            return BadRequest("Failed to get user's adds");
        }
    }

    [HttpGet("{userId}/favourites")] // GET /api/users/1/ads
    public async Task<ActionResult<IEnumerable<AdDto>>> GetFavAddsByUsername(string userId)
    {
        int IntuserId;
        if (int.TryParse(userId, out IntuserId))
        {
            List<AdDto> ads = (List<AdDto>)await _adRepository.GetFavAdsByUserId(IntuserId);
            return ads;
        }
        else
        {
            return BadRequest("Failed to get user's adds");
        }
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        if (user == null) return NotFound();

        _mapper.Map(memberUpdateDto, user);

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        var result = await _photoService.AddPhotoAsync(file);

        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new UserPhoto
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if (user.Photos.Count == 0) photo.IsMain = true;

        user.Photos.Add(photo);

        if (await _userRepository.SaveAllAsync())
            return CreatedAtAction(nameof(GetUser), new { username = user.UserName },
                _mapper.Map<PhotoDto>(photo));

        return BadRequest("Problem adding photo");
    }

    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("This is already your main photo");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMain != null) currentMain.IsMain = false;
        photo.IsMain = true;

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problem setting main photo");
    }

    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("You cannot delete your main photo");

        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        user.Photos.Remove(photo);

        if (await _userRepository.SaveAllAsync()) return Ok();

        return BadRequest("Problem deleting photo");
    }
}
