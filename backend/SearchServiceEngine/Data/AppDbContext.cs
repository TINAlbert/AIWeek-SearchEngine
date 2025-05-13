using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SearchServiceEngine.Models;

namespace SearchServiceEngine.Data;

public class AppDbContext : IdentityDbContext<User>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Elimino la propiedad Users para evitar conflicto con IdentityDbContext
    // public DbSet<User> Users => Set<User>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Contact>().HasData(
            new Contact {
                Id = 1,
                FirstName = "Juan",
                LastName = "Pérez",
                Document = "12345678A",
                Email = "juan.perez@example.com",
                Phone = "+34123456789",
                Address = "Calle Falsa 123, Madrid",
                Status = "Activo",
                CreatedAt = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc)
            },
            new Contact {
                Id = 2,
                FirstName = "Ana",
                LastName = "García",
                Document = "87654321B",
                Email = "ana.garcia@example.com",
                Phone = "+34987654321",
                Address = "Avenida Real 456, Barcelona",
                Status = "Inactivo",
                CreatedAt = new DateTime(2024, 1, 2, 12, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2024, 1, 2, 12, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
