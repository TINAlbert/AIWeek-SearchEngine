namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// DTO para la creación de un nuevo usuario.
    /// </summary>
    public class UserCreateDto
    {
        /// <summary>
        /// Nombre de usuario único.
        /// </summary>
        public string UserName { get; set; } = string.Empty;
        /// <summary>
        /// Contraseña del usuario.
        /// </summary>
        public string Password { get; set; } = string.Empty;
        /// <summary>
        /// Rol del usuario (por ejemplo, "User" o "Admin").
        /// </summary>
        public string Role { get; set; } = "User";
    }
}
