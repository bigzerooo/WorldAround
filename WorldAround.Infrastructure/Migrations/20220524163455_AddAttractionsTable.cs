using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorldAround.Infrastructure.Migrations
{
    public partial class AddAttractionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AttractionId",
                table: "Pins",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Attractions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attractions", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pins_AttractionId",
                table: "Pins",
                column: "AttractionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pins_Attractions_AttractionId",
                table: "Pins",
                column: "AttractionId",
                principalTable: "Attractions",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pins_Attractions_AttractionId",
                table: "Pins");

            migrationBuilder.DropTable(
                name: "Attractions");

            migrationBuilder.DropIndex(
                name: "IX_Pins_AttractionId",
                table: "Pins");

            migrationBuilder.DropColumn(
                name: "AttractionId",
                table: "Pins");
        }
    }
}
