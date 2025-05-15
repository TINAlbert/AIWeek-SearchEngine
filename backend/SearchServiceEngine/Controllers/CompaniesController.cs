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
    public class CompaniesController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IMapper _mapper;
        public CompaniesController(AppDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyDto>>> GetAll()
        {
            var companies = await _db.Companies.AsNoTracking().ToListAsync();
            return Ok(_mapper.Map<IEnumerable<CompanyDto>>(companies));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyDto>> GetById(int id)
        {
            var company = await _db.Companies.FindAsync(id);
            if (company == null) return NotFound();
            return Ok(_mapper.Map<CompanyDto>(company));
        }

        [HttpPost]
        public async Task<ActionResult<CompanyDto>> Create([FromBody] CompanyCreateDto dto)
        {
            var company = _mapper.Map<Company>(dto);
            _db.Companies.Add(company);
            await _db.SaveChangesAsync();
            var result = _mapper.Map<CompanyDto>(company);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CompanyUpdateDto dto)
        {
            var company = await _db.Companies.FindAsync(id);
            if (company == null) return NotFound();
            _mapper.Map(dto, company);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var company = await _db.Companies.Include(c => c.Contacts).FirstOrDefaultAsync(c => c.Id == id);
            if (company == null) return NotFound();
            if (company.Contacts.Any())
                return BadRequest("No se puede eliminar una empresa con contactos asociados.");
            _db.Companies.Remove(company);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
