using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SearchServiceEngine.Models;
using SearchServiceEngine.Data;
using Microsoft.AspNetCore.Authorization;

namespace SearchServiceEngine.Controllers
{
    /// <summary>
    /// Controlador de usuarios. Permite consultar y gestionar usuarios (requiere rol Admin).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene la lista de todos los usuarios registrados. Requiere rol Admin.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public ActionResult<IEnumerable<object>> GetAll()
        {
            // No devolver contraseñas en producción
            var users = _context.Users.Select(u => new { u.Id, u.Username, u.Role }).ToList();
            return Ok(users);
        }

        [HttpPost("seed")]
        [AllowAnonymous]
        public IActionResult Seed()
        {
            if (!_context.Users.Any())
            {
                _context.Users.AddRange(
                    new User { Username = "admin", Password = "admin123", Role = "Admin" },
                    new User { Username = "user", Password = "user123", Role = "User" }
                );
                _context.SaveChanges();
                return Ok("Usuarios de ejemplo insertados.");
            }
            return Ok("Ya existen usuarios en la base de datos.");
        }
    }
}
