using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SearchServiceEngine.Data;
using SearchServiceEngine.DTOs;
using SearchServiceEngine.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace SearchServiceEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfilesController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;
        public ProfilesController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfileDto>>> GetAll()
        {
            var profiles = await _db.Profiles.AsNoTracking().ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProfileDto>>(profiles));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProfileDto>> GetById(int id)
        {
            var profile = await _db.Profiles.FindAsync(id);
            if (profile == null) return NotFound();
            return Ok(_mapper.Map<ProfileDto>(profile));
        }

        [HttpPost]
        public async Task<ActionResult<ProfileDto>> Create([FromBody] ProfileCreateDto dto)
        {
            var profile = _mapper.Map<Models.Profile>(dto);
            _db.Profiles.Add(profile);
            await _db.SaveChangesAsync();
            var result = _mapper.Map<ProfileDto>(profile);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProfileUpdateDto dto)
        {
            var profile = await _db.Profiles.FindAsync(id);
            if (profile == null) return NotFound();
            _mapper.Map(dto, profile);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var profile = await _db.Profiles.Include(p => p.Contacts).FirstOrDefaultAsync(p => p.Id == id);
            if (profile == null) return NotFound();
            if (profile.Contacts.Any())
                return BadRequest("No se puede eliminar un perfil con contactos asociados.");
            _db.Profiles.Remove(profile);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
