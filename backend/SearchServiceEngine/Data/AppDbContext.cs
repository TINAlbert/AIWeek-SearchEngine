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
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Profile> Profiles => Set<Profile>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Company>()
            .HasMany(c => c.Contacts)
            .WithOne(c => c.Company)
            .HasForeignKey(c => c.CompanyId)
            .OnDelete(DeleteBehavior.SetNull);
        builder.Entity<Contact>()
            .HasMany(c => c.Profiles)
            .WithMany(p => p.Contacts)
            .UsingEntity(j => j.ToTable("ContactProfiles"));
        // builder.Entity<Company>()
        //     .HasMany(c => c.Profiles)
        //     .WithMany(p => p.Companies)
        //     .UsingEntity(j => j.ToTable("CompanyProfiles"));
        // Elimino la columna ProfileId en Company si existe de migraciones previas incorrectas
        builder.Entity<Company>().Ignore("ProfileId");
        builder.Entity<Contact>().HasData(
            new Contact {
                Id = 1,
                FirstName = "Juan",
                LastName = "Pérez",
                Document = "12345678A",
                Email = "juan.perez@example.com",
                Phone = "+34123456789",
                Address = "Calle Falsa 123, Madrid",
                Status = ContactStatus.Activo,
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
                Status = ContactStatus.Inactivo,
                CreatedAt = new DateTime(2024, 1, 2, 12, 0, 0, DateTimeKind.Utc),
                UpdatedAt = new DateTime(2024, 1, 2, 12, 0, 0, DateTimeKind.Utc)
            }
        );
    }
}
