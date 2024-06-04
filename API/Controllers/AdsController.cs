using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdsController : BaseApiController
{
    private readonly IAdRepository _adRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public AdsController(IAdRepository adRepository, IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
    {
        _adRepository = adRepository;
        _userRepository = userRepository;
        _mapper = mapper;
        _photoService = photoService;
    }

    [HttpGet] // GET /api/ads
    public async Task<ActionResult<IEnumerable<AdDto>>> GetAds()
    {
        List<AdDto> ads = (List<AdDto>)await _adRepository.GetAdsAsync();
        return ads;
    }

    [HttpGet("{id}")] // GET /api/ads/2
    public async Task<ActionResult<AdDto>> GetAdd(string id)
    {
        int IntId;
        if (int.TryParse(id, out IntId))
        {
            return await _adRepository.GetAdAsync(IntId);
        }
        else
        {
            return BadRequest("Failed to get add");
        }
    }

    [HttpPost("uploadAd")] // POST: api/ads/uploadAd
    public async Task<ActionResult> UploadAd(AdDto adDto)
    {
        Ad newAd = new Ad {
            AppUserId = adDto.UserId,
            Created = DateTime.UtcNow,
            Title = adDto.Title,
            Description = adDto.Description
        };

        _adRepository.uploadAd(newAd);
        if (await _adRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to upload new Ad");
    }

    [HttpPut("updateAd")]
    public async Task<ActionResult> UpdateAd(AdUpdateDto adUpdateDto)
    {
        var ad = await _adRepository.GetAdByIdAsync(adUpdateDto.Id);

        if (ad == null) return NotFound();

        _mapper.Map(adUpdateDto, ad);

        if (await _adRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update ad");
    }

    [HttpPost("like/{id}/{username}")] // POST: api/ads/like/1/johnDoe
    public async Task<ActionResult> LikeAd(int id, string username)
    {
        var ad = await _adRepository.GetAdAsync(id);
        if (ad == null) return NotFound("Ad not found");
        _adRepository.likeAd(ad, username);
        if (await _userRepository.SaveAllAsync()) return NoContent();
        return BadRequest("Failed to like ad");
    }

    [HttpPost("comment")] // POST: api/ads/comment
    public async Task<ActionResult> CommentAd(CommentDto commentDto)
    {
        var ad = await _adRepository.GetAdByIdAsync(commentDto.AdId);
        if (ad == null) return NotFound("Ad not found");
        var author = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
        if (author == null) return NotFound("Author not found");

        var comment = new Comment {
            AdId = commentDto.AdId,
            AuthorUsername = author.UserName,
            Text = commentDto.Text
        };
        if (ad.Comments == null) {
            ad.Comments = new List<Comment>();
        }
        ad.Comments.Add(comment);
        if (await _adRepository.SaveAllAsync()) return
            CreatedAtAction(nameof(CommentAd), new {id = ad.Id},
            _mapper.Map<CommentDto>(comment));
        return BadRequest("Failed to comment ad");
    }

    [HttpPost("add-photo/{id}")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, int id )
    {
        var ad = await _adRepository.GetAdByIdAsync(id);

        var result = await _photoService.AddPhotoAsync(file);

        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new AdPhoto
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if (ad.Photos.Count == 0) photo.IsMain = true;

        ad.Photos.Add(photo);

        if (await _adRepository.SaveAllAsync())
            return CreatedAtAction(nameof(AddPhoto), new {id = ad.Id},
                _mapper.Map<PhotoDto>(photo));

        return BadRequest("Problem adding photo");
    }

    [HttpPut("set-main-photo/{addId}/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int addId, int photoId)
    {
        var ad = await _adRepository.GetAdByIdAsync(addId);

        var photo = ad.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("This is already your main photo");

        var currentMain = ad.Photos.FirstOrDefault(x => x.IsMain);
        if (currentMain != null) currentMain.IsMain = false;
        photo.IsMain = true;

        if (await _adRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problem setting main photo");
    }

    [HttpDelete("delete-photo/{addId}/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int addId, int photoId)
    {
        var ad = await _adRepository.GetAdByIdAsync(addId);

        var photo = ad.Photos.FirstOrDefault(x => x.Id == photoId);

        if (photo == null) return NotFound();

        if (photo.IsMain) return BadRequest("You cannot delete your main photo");

        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        ad.Photos.Remove(photo);

        if (await _adRepository.SaveAllAsync()) return Ok();

        return BadRequest("Problem deleting photo");
    }

}
