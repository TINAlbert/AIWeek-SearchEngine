using SearchServiceEngine.Models;

namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// DTO para la creación de un nuevo contacto.
    /// </summary>
    public class ContactCreateDto
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
        public ContactStatus Status { get; set; } = ContactStatus.Activo;
        /// <summary>
        /// ID de la empresa asociada al contacto (opcional).
        /// </summary>
        public int? CompanyId { get; set; }
        /// <summary>
        /// IDs de los perfiles asociados al contacto.
        /// </summary>
        public List<int> ProfileIds { get; set; } = new();
    }
}
