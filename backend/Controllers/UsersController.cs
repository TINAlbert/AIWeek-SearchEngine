using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

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
