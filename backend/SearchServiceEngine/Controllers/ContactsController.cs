using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SearchServiceEngine.DTOs;
using SearchServiceEngine.Services;

namespace SearchServiceEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;
        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        /// <summary>
        /// Obtiene una lista paginada de contactos, con opción de filtrar por nombre o email.
        /// </summary>
        /// <param name="filter">Texto para filtrar por nombre o email (opcional).</param>
        /// <param name="page">Número de página (por defecto 1).</param>
        /// <param name="pageSize">Tamaño de página (por defecto 10).</param>
        /// <returns>Lista paginada de contactos.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(PagedResultDto<ContactDto>), 200)]
        public async Task<IActionResult> GetAll([FromQuery] string? filter, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var data = await _contactService.GetAllAsync(filter, page, pageSize);
            var total = await _contactService.CountAsync(filter);
            var totalPages = (int)Math.Ceiling((double)total / pageSize);
            var result = new PagedResultDto<ContactDto>
            {
                Data = data,
                Total = total,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages,
                HasNextPage = page < totalPages,
                HasPreviousPage = page > 1
            };
            return Ok(result);
        }

        /// <summary>
        /// Obtiene un contacto por su identificador único.
        /// </summary>
        /// <param name="id">Identificador del contacto.</param>
        /// <returns>El contacto solicitado o NotFound si no existe.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id <= 0)
                return BadRequest();
            var result = await _contactService.GetByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        /// <summary>
        /// Crea un nuevo contacto.
        /// </summary>
        /// <param name="dto">Datos del contacto a crear.</param>
        /// <returns>El contacto creado.</returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ContactCreateDto dto)
        {
            try
            {
                var created = await _contactService.CreateAsync(dto);
                if (created == null)
                    return BadRequest();
                return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Actualiza un contacto existente.
        /// </summary>
        /// <param name="id">Identificador del contacto a actualizar.</param>
        /// <param name="dto">Datos actualizados del contacto.</param>
        /// <returns>NoContent si se actualizó correctamente, NotFound si no existe.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ContactUpdateDto dto)
        {
            if (id <= 0 || dto == null)
                return BadRequest();
            try
            {
                var updated = await _contactService.UpdateAsync(id, dto);
                if (!updated) return NotFound();
                return NoContent();
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Elimina un contacto por su identificador.
        /// </summary>
        /// <param name="id">Identificador del contacto a eliminar.</param>
        /// <returns>NoContent si se eliminó correctamente, NotFound si no existe.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest();
            try
            {
                var deleted = await _contactService.DeleteAsync(id);
                if (!deleted) return NotFound();
                return NoContent();
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Añade un perfil a un contacto.
        /// </summary>
        /// <param name="id">Id del contacto.</param>
        /// <param name="profileId">Id del perfil a añadir.</param>
        [HttpPost("{id}/profiles/{profileId}")]
        public async Task<IActionResult> AddProfile(int id, int profileId, [FromServices] IContactService contactService)
        {
            if (id <= 0 || profileId <= 0)
                return BadRequest();
            var contact = await contactService.GetByIdAsync(id);
            if (contact == null) return NotFound();
            var updated = await contactService.AddProfileAsync(id, profileId);
            if (!updated) return NotFound("Perfil no encontrado o ya asociado.");
            return NoContent();
        }

        /// <summary>
        /// Quita un perfil de un contacto.
        /// </summary>
        /// <param name="id">Id del contacto.</param>
        /// <param name="profileId">Id del perfil a quitar.</param>
        [HttpDelete("{id}/profiles/{profileId}")]
        public async Task<IActionResult> RemoveProfile(int id, int profileId, [FromServices] IContactService contactService)
        {
            if (id <= 0 || profileId <= 0)
                return BadRequest();
            var contact = await contactService.GetByIdAsync(id);
            if (contact == null) return NotFound();
            var updated = await contactService.RemoveProfileAsync(id, profileId);
            if (!updated) return NotFound("Perfil no encontrado o no asociado.");
            return NoContent();
        }

        /// <summary>
        /// Búsqueda avanzada de contactos con múltiples filtros opcionales.
        /// </summary>
        /// <param name="filterDto">Objeto de filtro avanzado.</param>
        /// <returns>Lista paginada de contactos que cumplen los criterios.</returns>
        [HttpPost("search-advanced")]
        [ProducesResponseType(typeof(PagedResultDto<ContactDto>), 200)]
        public async Task<IActionResult> SearchAdvanced([FromBody] ContactAdvancedFilterDto filterDto)
        {
            if (filterDto == null)
                return BadRequest();
            var result = await _contactService.SearchAdvancedAsync(filterDto);
            return Ok(result);
        }
    }
}
