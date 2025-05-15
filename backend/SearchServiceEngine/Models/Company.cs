using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SearchServiceEngine.Models
{
    public class Company
    {
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Country { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Phone { get; set; } = string.Empty;

        public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
    }
}
