using System.Collections.Generic;

namespace SearchServiceEngine.DTOs
{
    public class ContactExportRequestDto
    {
        public string Search { get; set; } // Para búsqueda simple
        public ContactAdvancedFilterDto AdvancedFilter { get; set; } // Para búsqueda avanzada
    }
}
