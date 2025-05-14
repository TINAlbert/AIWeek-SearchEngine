using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SearchServiceEngine.Migrations
{
    /// <inheritdoc />
    public partial class SeedContacts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var now = DateTime.UtcNow;
            var contacts = new object[500, 10];
            for (int i = 0; i < 500; i++)
            {
                contacts[i, 0] = i + 1; // Id
                contacts[i, 1] = $"Calle Ejemplo {i + 1}, Ciudad";
                contacts[i, 2] = now;
                contacts[i, 3] = $"DOC{i + 1:D6}";
                contacts[i, 4] = $"contacto{i + 1}@ejemplo.com";
                contacts[i, 5] = $"Nombre{i + 1}";
                contacts[i, 6] = $"Apellido{i + 1}";
                contacts[i, 7] = $"+3400000{i + 1:D4}";
                contacts[i, 8] = i % 2 == 0 ? "Activo" : "Inactivo";
                contacts[i, 9] = now;
            }
            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Address", "CreatedAt", "Document", "Email", "FirstName", "LastName", "Phone", "Status", "UpdatedAt" },
                values: contacts
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
