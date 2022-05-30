using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorldAround.Infrastructure.Migrations
{
    public partial class Update_Dependencies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Trips_TripId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Pins_Attractions_AttractionId",
                table: "Pins");

            migrationBuilder.DropIndex(
                name: "IX_Events_TripId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "TripId",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "SequenceNo",
                table: "Pins",
                newName: "SequenceNumber");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "Events",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "AspNetUsers",
                type: "bit",
                nullable: true,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "EmailConfirmed",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.CreateTable(
                name: "TripEventLink",
                columns: table => new
                {
                    EventsId = table.Column<int>(type: "int", nullable: false),
                    TripsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TripEventLink", x => new { x.EventsId, x.TripsId });
                    table.ForeignKey(
                        name: "FK_TripEventLink_Events_EventsId",
                        column: x => x.EventsId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TripEventLink_Trips_TripsId",
                        column: x => x.TripsId,
                        principalTable: "Trips",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TripEventLink_TripsId",
                table: "TripEventLink",
                column: "TripsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pins_Attractions_AttractionId",
                table: "Pins",
                column: "AttractionId",
                principalTable: "Attractions",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pins_Attractions_AttractionId",
                table: "Pins");

            migrationBuilder.DropTable(
                name: "TripEventLink");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "SequenceNumber",
                table: "Pins",
                newName: "SequenceNo");

            migrationBuilder.AddColumn<int>(
                name: "TripId",
                table: "Events",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true,
                oldDefaultValue: true);

            migrationBuilder.AlterColumn<bool>(
                name: "EmailConfirmed",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true);

            migrationBuilder.CreateIndex(
                name: "IX_Events_TripId",
                table: "Events",
                column: "TripId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Trips_TripId",
                table: "Events",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pins_Attractions_AttractionId",
                table: "Pins",
                column: "AttractionId",
                principalTable: "Attractions",
                principalColumn: "Id");
        }
    }
}
