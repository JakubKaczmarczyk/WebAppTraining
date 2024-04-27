using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IAdRepository _adRepository;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository userRepository, IAdRepository adRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _adRepository = adRepository;
        _mapper = mapper;
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
        return await _userRepository.GetMemberAsync(username);
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

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _userRepository.GetUserByUsernameAsync(username);

        if (user == null) return NotFound();

        _mapper.Map(memberUpdateDto, user);

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }
}
