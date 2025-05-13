namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// DTO para exponer información de un contacto.
    /// </summary>
    public class ContactDto
    {
        /// <summary>
        /// Identificador único del contacto.
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Nombre del contacto.
        /// </summary>
        public string FirstName { get; set; } = string.Empty;
        /// <summary>
        /// Apellido del contacto.
        /// </summary>
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
        /// Teléfono del contacto.
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
