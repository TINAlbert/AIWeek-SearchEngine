using System.Collections.Generic;

namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// DTO para búsqueda avanzada de contactos con múltiples filtros opcionales.
    /// </summary>
    public class ContactAdvancedFilterDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public int? CompanyId { get; set; }
        public string? CompanyName { get; set; }
        public List<int>? ProfileIds { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
