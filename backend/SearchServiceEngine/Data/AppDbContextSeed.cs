using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SearchServiceEngine.Models;

namespace SearchServiceEngine.Data
{
    public static class AppDbContextSeed
    {
        public static async Task SeedAsync(AppDbContext context, UserManager<User> userManager)
        {
            // 1. Usuarios
            if (!userManager.Users.Any())
            {
                var admin = new User
                {
                    UserName = "Admin",
                    FirstName = "Admin",
                    LastName = "Admin",
                    Email = "admin@aiweek.local",
                    Role = "Admin",
                    EmailConfirmed = true,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await userManager.CreateAsync(admin, "Admin123!");

                var user = new User
                {
                    UserName = "User",
                    FirstName = "User",
                    LastName = "User",
                    Email = "user@aiweek.local",
                    Role = "User",
                    EmailConfirmed = true,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                await userManager.CreateAsync(user, "User123!");
            }

            // 2. Perfiles
            if (!context.Profiles.Any())
            {
                var profiles = new[]
                {
                    new Profile { Name = "Cliente", Description = "Cliente de la empresa" },
                    new Profile { Name = "Proveedor", Description = "Proveedor de servicios o productos" },
                    new Profile { Name = "Socio", Description = "Socio estratégico o comercial" },
                    new Profile { Name = "Empleado", Description = "Empleado interno" },
                    new Profile { Name = "Prospecto", Description = "Contacto potencial" },
                    new Profile { Name = "VIP", Description = "Contacto de alta prioridad" }
                };
                context.Profiles.AddRange(profiles);
                await context.SaveChangesAsync();
            }

            // 3. Empresas
            if (!context.Companies.Any())
            {
                var companies = new[]
                {
                    new Company { Name = "InovaTech Solutions", Address = "Calle Innovación 1", City = "Madrid", Country = "España", Phone = "+34910000001" },
                    new Company { Name = "AgroGlobal S.A.", Address = "Av. Agricultura 22", City = "Sevilla", Country = "España", Phone = "+34910000002" },
                    new Company { Name = "BlueWave Consulting", Address = "Paseo Marítimo 5", City = "Barcelona", Country = "España", Phone = "+34910000003" },
                    new Company { Name = "Logística Express SL", Address = "Calle Transporte 10", City = "Valencia", Country = "España", Phone = "+34910000004" }
                };
                context.Companies.AddRange(companies);
                await context.SaveChangesAsync();
            }

            // 4. Contactos (solo si hay menos de 1000)
            if (context.Contacts.Count() < 1000)
            {
                var random = new Random();
                var firstNames = new[] { "Juan", "Ana", "Luis", "María", "Carlos", "Lucía", "Pedro", "Sofía", "Miguel", "Elena", "David", "Laura", "Javier", "Carmen", "Manuel", "Paula", "Alberto", "Sara", "Francisco", "Marta" };
                var lastNames = new[] { "Pérez", "García", "López", "Martínez", "Sánchez", "Romero", "Díaz", "Alonso", "Torres", "Ruiz", "Vargas", "Castro", "Molina", "Ortega", "Silva", "Ramos", "Navarro", "Serrano", "Moreno", "Delgado" };
                var companies = context.Companies.ToList();
                var profiles = context.Profiles.ToList();
                var contacts = new List<Contact>();
                for (int i = 0; i < 1000; i++)
                {
                    var firstName = firstNames[random.Next(firstNames.Length)];
                    var lastName = lastNames[random.Next(lastNames.Length)];
                    var email = $"{firstName.ToLower()}.{lastName.ToLower()}{i}@example.com";
                    var contact = new Contact
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        Document = $"DOC{i:0000}",
                        Email = email,
                        Phone = $"+34{random.Next(600000000, 699999999)}",
                        Address = $"Calle {lastName} {random.Next(1, 200)}",
                        City = new[] { "Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao", "Zaragoza" }[random.Next(6)],
                        Status = (ContactStatus)random.Next(0, 3),
                        CreatedAt = DateTime.UtcNow.AddDays(-random.Next(0, 365)),
                        UpdatedAt = DateTime.UtcNow,
                        CompanyId = (random.NextDouble() < 0.8 && companies.Count > 0) ? companies[random.Next(companies.Count)].Id : null
                    };
                    // Asignar perfiles aleatorios (0 a n)
                    int nProfiles = random.Next(0, profiles.Count + 1);
                    var assignedProfiles = profiles.OrderBy(x => random.Next()).Take(nProfiles).ToList();
                    foreach (var p in assignedProfiles)
                        contact.Profiles.Add(p);
                    contacts.Add(contact);
                }
                context.Contacts.AddRange(contacts);
                await context.SaveChangesAsync();
            }
        }
    }
}
