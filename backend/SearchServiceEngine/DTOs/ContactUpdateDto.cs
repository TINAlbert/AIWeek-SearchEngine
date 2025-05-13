namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// DTO para la actualización de un contacto existente.
    /// </summary>
    public class ContactUpdateDto
    {
        /// <summary>
        /// Nombre completo del contacto.
        /// </summary>
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        /// <summary>
        /// Documento del contacto.
        /// </summary>
        public string Document { get; set; } = string.Empty;
        /// <summary>
        /// Dirección de correo electrónico del contacto.
        /// </summary>
        public string Email { get; set; } = string.Empty;
        /// <summary>
        /// Teléfono del contacto (opcional).
        /// </summary>
        public string Phone { get; set; } = string.Empty;
        /// <summary>
        /// Dirección del contacto.
        /// </summary>
        public string Address { get; set; } = string.Empty;
        /// <summary>
        /// Estado del contacto.
        /// </summary>
        public string Status { get; set; } = string.Empty;
    }
}
