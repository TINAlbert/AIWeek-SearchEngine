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
        private readonly IConfiguration _configuration;
        public UsersController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Obtiene la lista de todos los usuarios registrados. Requiere rol Admin.
        /// </summary>
        /// <returns>Lista de usuarios.</returns>
        [HttpGet]
        [Authorize(Roles = "Admin")] // Protección por rol usando Identity
        public IActionResult GetAll()
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

        /// <summary>
        /// Crea un nuevo usuario. Solo accesible para administradores.
        /// </summary>
        /// <param name="dto">Datos del usuario a crear (UserName, Password, Role).</param>
        /// <param name="userManager">UserManager inyectado para la gestión de usuarios.</param>
        /// <returns>Usuario creado (Id, UserName, Role) o errores de validación/conflicto.</returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] DTOs.UserCreateDto dto, [FromServices] UserManager<User> userManager)
        {
            var validator = new DTOs.UserCreateDtoValidator();
            var validation = validator.Validate(dto);
            if (!validation.IsValid)
                return BadRequest(validation.Errors);

            var exists = await userManager.FindByNameAsync(dto.UserName);
            if (exists != null)
                return Conflict("El nombre de usuario ya existe.");

            var user = new User { UserName = dto.UserName, Role = dto.Role };
            var result = await userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { user.Id, user.UserName, user.Role });
        }

        /// <summary>
        /// Obtiene un usuario por su identificador. Requiere rol Admin.
        /// </summary>
        /// <param name="id">Id del usuario.</param>
        /// <returns>Usuario encontrado o NotFound.</returns>
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(new { user.Id, user.UserName, user.Role, user.Email });
        }

        /// <summary>
        /// Obtiene los datos del usuario autenticado actual.
        /// </summary>
        /// <returns>Datos del usuario autenticado.</returns>
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var userId = User?.Identities?.FirstOrDefault()?.Claims?.FirstOrDefault(c => c.Type == "sub")?.Value
                ?? User?.Identities?.FirstOrDefault()?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound();
            return Ok(new { user.Id, user.UserName, user.Role, user.Email });
        }

        /// <summary>
        /// Sube o reemplaza el avatar del usuario autenticado.
        /// </summary>
        /// <param name="file">Archivo de imagen (avatar).</param>
        /// <returns>Resultado de la operación.</returns>
        [HttpPost("me/avatar")]
        [Authorize]
        public async Task<IActionResult> UploadAvatar([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No se ha enviado ningún archivo.");
            var userId = User?.Identities?.FirstOrDefault()?.Claims?.FirstOrDefault(c => c.Type == "sub")?.Value
                ?? User?.Identities?.FirstOrDefault()?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions.Contains(ext))
                return BadRequest("Formato de archivo no permitido.");
            var avatarsPath = _configuration["AvatarsPath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");
            if (!Directory.Exists(avatarsPath))
                Directory.CreateDirectory(avatarsPath);
            var fileName = $"{user.Id}{ext}";
            var filePath = Path.Combine(avatarsPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            user.AvatarFileName = fileName;
            user.UpdatedAt = DateTime.UtcNow;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Avatar actualizado", fileName });
        }

        /// <summary>
        /// Obtiene el avatar del usuario autenticado.
        /// </summary>
        /// <returns>Archivo de imagen del avatar.</returns>
        [HttpGet("me/avatar")]
        [Authorize]
        public async Task<IActionResult> GetMyAvatar()
        {
            var userId = User?.Identities?.FirstOrDefault()?.Claims?.FirstOrDefault(c => c.Type == "sub")?.Value
                ?? User?.Identities?.FirstOrDefault()?.Claims?.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();
            var user = await _context.Users.FindAsync(userId);
            if (user == null || string.IsNullOrEmpty(user.AvatarFileName))
                return NotFound();
            var avatarsPath = _configuration["AvatarsPath"] ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");
            var filePath = Path.Combine(avatarsPath, user.AvatarFileName);
            if (!System.IO.File.Exists(filePath))
                return NotFound();
            var ext = Path.GetExtension(user.AvatarFileName).ToLowerInvariant();
            var contentType = ext switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };
            var bytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(bytes, contentType);
        }
    }
}
