using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SearchServiceEngine.Migrations
{
    /// <inheritdoc />
    public partial class SeedContactsFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 1, 1, 12, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 1, 12, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 1, 2, 12, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 2, 12, 0, 0, 0, DateTimeKind.Utc) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4030), new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4141) });

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4208), new DateTime(2025, 5, 13, 8, 2, 6, 187, DateTimeKind.Utc).AddTicks(4209) });
        }
    }
}
