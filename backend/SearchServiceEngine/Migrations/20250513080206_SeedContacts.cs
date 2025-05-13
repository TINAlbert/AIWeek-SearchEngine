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
            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "Id", "Address", "CreatedAt", "Document", "Email", "FirstName", "LastName", "Phone", "Status", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "Calle Falsa 123, Madrid", new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4030), "12345678A", "juan.perez@example.com", "Juan", "Pérez", "+34123456789", "Activo", new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4141) },
                    { 2, "Avenida Real 456, Barcelona", new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4208), "87654321B", "ana.garcia@example.com", "Ana", "García", "+34987654321", "Inactivo", new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4209) }
                });
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
