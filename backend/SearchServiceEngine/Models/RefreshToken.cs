using System;

namespace SearchServiceEngine.Models
{
    /// <summary>
    /// Representa un refresh token para autenticación y renovación de sesión.
    /// </summary>
    public class RefreshToken
    {
        /// <summary>
        /// Identificador único del refresh token.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Token generado de forma segura.
        /// </summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// Identificador del usuario asociado (string, FK a AspNetUsers).
        /// </summary>
        public string UserId { get; set; } = string.Empty;

        /// <summary>
        /// Usuario asociado al token.
        /// </summary>
        public User? User { get; set; }

        /// <summary>
        /// Fecha de expiración del token.
        /// </summary>
        public DateTime Expires { get; set; }

        /// <summary>
        /// Fecha de creación del token.
        /// </summary>
        public DateTime Created { get; set; }

        /// <summary>
        /// Fecha de revocación (si aplica).
        /// </summary>
        public DateTime? Revoked { get; set; }

        /// <summary>
        /// Indica si el token está activo (no expirado ni revocado).
        /// </summary>
        public bool IsActive => Revoked == null && !IsExpired;

        /// <summary>
        /// Indica si el token está expirado.
        /// </summary>
        public bool IsExpired => DateTime.UtcNow >= Expires;
    }
}
