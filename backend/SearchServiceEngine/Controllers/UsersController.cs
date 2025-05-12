using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SearchServiceEngine.Models;
using SearchServiceEngine.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace SearchServiceEngine.Controllers
{
    /// <summary>
    /// Controlador de usuarios. Permite consultar y gestionar usuarios (requiere rol Admin).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Protección global para todos los endpoints del controlador
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
        [Authorize(Roles = "Admin")] // Protección por rol usando Identity
        public ActionResult<IEnumerable<object>> GetAll()
        {
            var users = _context.Users.Select(u => new { u.Id, u.UserName, u.Role }).ToList();
            return Ok(users);
        }

        [HttpPost("seed")]
        [AllowAnonymous]
        public async Task<IActionResult> Seed([FromServices] UserManager<User> userManager)
        {
            if (!_context.Users.Any())
            {
                var admin = new User { UserName = "admin", Role = "Admin" };
                var user = new User { UserName = "user", Role = "User" };
                await userManager.CreateAsync(admin, "admin123");
                await userManager.CreateAsync(user, "user123");
                return Ok("Usuarios de ejemplo insertados.");
            }
            return Ok("Ya existen usuarios en la base de datos.");
        }
    }
}
