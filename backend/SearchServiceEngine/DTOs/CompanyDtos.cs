using System.ComponentModel.DataAnnotations;

namespace SearchServiceEngine.DTOs
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    public class CompanyCreateDto
    {
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
    }

    public class CompanyUpdateDto
    {
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
    }
}
