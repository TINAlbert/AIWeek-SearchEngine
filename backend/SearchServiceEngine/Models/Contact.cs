using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SearchServiceEngine.Models
{
    public enum ContactStatus
    {
        Activo,
        Inactivo,
        Pendiente
    }

    public class Contact
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Document { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(30)]
        public string Phone { get; set; } = string.Empty;

        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;

        [Required]
        public ContactStatus Status { get; set; } = ContactStatus.Activo;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public int? CompanyId { get; set; }
        public Company? Company { get; set; }

        public ICollection<Profile> Profiles { get; set; } = new List<Profile>();
    }
}
