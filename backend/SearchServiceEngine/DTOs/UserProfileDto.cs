namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// DTO para exponer los datos de perfil de usuario.
    /// </summary>
    public class UserProfileDto
    {
        /// <summary>
        /// Identificador único del usuario.
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// Nombre de usuario (login).
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// Email del usuario.
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Rol asignado (Admin/User).
        /// </summary>
        public string Role { get; set; }
        /// <summary>
        /// Nombre(s) del usuario.
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// Apellido(s) del usuario.
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Indica si el usuario está activo.
        /// </summary>
        public bool IsActive { get; set; }
        /// <summary>
        /// Fecha de creación del usuario.
        /// </summary>
        public DateTime CreatedAt { get; set; }
        /// <summary>
        /// Fecha de última actualización del usuario.
        /// </summary>
        public DateTime UpdatedAt { get; set; }
        /// <summary>
        /// Nombre del archivo de avatar (si existe).
        /// </summary>
        public string? AvatarFileName { get; set; }
    }
}
