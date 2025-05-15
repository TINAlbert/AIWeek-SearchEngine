using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SearchServiceEngine.Models
{
    /// <summary>
    /// Usuario de la aplicación, extendido con campos de perfil y avatar.
    /// </summary>
    public class User : IdentityUser
    {
        /// <summary>
        /// Rol del usuario (Admin/User).
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string Role { get; set; } = string.Empty;

        /// <summary>
        /// Nombre(s) del usuario.
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// Apellido(s) del usuario.
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        /// <summary>
        /// Indica si el usuario está activo.
        /// </summary>
        public bool IsActive { get; set; } = true;

        /// <summary>
        /// Fecha de creación del usuario.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Fecha de última actualización del usuario.
        /// </summary>
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Nombre del archivo de avatar subido por el usuario.
        /// </summary>
        [MaxLength(128)]
        public string? AvatarFileName { get; set; }
    }
}
