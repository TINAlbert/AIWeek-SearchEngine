using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SearchServiceEngine.Migrations
{
    /// <inheritdoc />
    public partial class AddCityToContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Contacts",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 1,
                column: "City",
                value: "");

            migrationBuilder.UpdateData(
                table: "Contacts",
                keyColumn: "Id",
                keyValue: 2,
                column: "City",
                value: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Contacts");
        }
    }
}
