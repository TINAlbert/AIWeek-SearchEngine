using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SearchServiceEngine.Models
{
    public class Profile
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Description { get; set; } = string.Empty;

        // Relación muchos a muchos con Contact
        public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
        // Eliminada la relación muchos a muchos con Company para limpiar migraciones y modelo
    }
}
