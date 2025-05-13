using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using SearchServiceEngine.Data;
using SearchServiceEngine.Models;
using Microsoft.AspNetCore.Identity;
using SearchServiceEngine.Request;
using SearchServiceEngine.Services;

namespace SearchServiceEngine.Controllers
{
    /// <summary>
    /// Controlador de autenticación. Permite iniciar sesión y obtener un JWT válido.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IRefreshTokenService _refreshTokenService;
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config, IRefreshTokenService refreshTokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _refreshTokenService = refreshTokenService;
        }

        /// <summary>
        /// Inicia sesión con usuario y contraseña. Devuelve un JWT y un refresh token si las credenciales son válidas.
        /// </summary>
        /// <param name="loginRequest">Usuario y contraseña.</param>
        /// <returns>Un objeto con el access token (JWT) y el refresh token, o 401 si no autorizado.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.UserName);
            if (user == null)
                return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);
            if (!result.Succeeded)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                new Claim(ClaimTypes.NameIdentifier, user.Id ?? string.Empty),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no configurado")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            // Invalidar todos los refresh tokens anteriores del usuario
            await _refreshTokenService.InvalidateAllAsync(user.Id);

            // Generar refresh token y devolverlo junto al access token
            var refreshToken = await _refreshTokenService.GenerateAsync(user, HttpContext.Connection.RemoteIpAddress?.ToString() ?? "");
            return Ok(new { token = jwt, refreshToken = refreshToken.Token });
        }

        /// <summary>
        /// Renueva el access token usando un refresh token válido. Revoca el refresh token anterior y entrega uno nuevo.
        /// </summary>
        /// <param name="refreshToken">Refresh token válido.</param>
        /// <returns>Un objeto con el nuevo access token (JWT) y refresh token, o 401 si no autorizado.</returns>
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] string refreshToken)
        {
            var storedToken = await _refreshTokenService.GetByTokenAsync(refreshToken);
            if (storedToken == null || !storedToken.IsActive)
                return Unauthorized();

            var user = storedToken.User;
            if (user == null)
                return Unauthorized();

            // Revocar el token anterior
            await _refreshTokenService.RevokeAsync(storedToken);

            // Generar nuevo access token y refresh token
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                new Claim(ClaimTypes.NameIdentifier, user.Id ?? string.Empty),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no configurado")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            var newRefreshToken = await _refreshTokenService.GenerateAsync(user, HttpContext.Connection.RemoteIpAddress?.ToString() ?? "");
            return Ok(new { token = jwt, refreshToken = newRefreshToken.Token });
        }

        /// <summary>
        /// Revoca un refresh token (logout seguro). El token no podrá ser reutilizado.
        /// </summary>
        /// <param name="refreshToken">Refresh token a revocar.</param>
        /// <returns>NoContent si se revocó correctamente, 404 si no existe o ya está revocado.</returns>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] string refreshToken)
        {
            var storedToken = await _refreshTokenService.GetByTokenAsync(refreshToken);
            if (storedToken == null || !storedToken.IsActive)
                return NotFound();
            await _refreshTokenService.RevokeAsync(storedToken);
            return NoContent();
        }
    }
}
