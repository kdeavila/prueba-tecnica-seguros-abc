using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SegurosApi.Migrations
{
    /// <inheritdoc />
    public partial class AseguradoToInsured : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Asegurados");

            migrationBuilder.CreateTable(
                name: "Insureds",
                columns: table => new
                {
                    IdentificationNumber = table.Column<long>(type: "bigint", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FirstLastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    SecondLastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    PhoneNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    BirthDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EstimatedInsuranceValue = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insureds", x => x.IdentificationNumber);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Insureds_Email",
                table: "Insureds",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Insureds");

            migrationBuilder.CreateTable(
                name: "Asegurados",
                columns: table => new
                {
                    NumeroIdentificacion = table.Column<long>(type: "bigint", nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    FechaNacimiento = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Observaciones = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    PrimerApellido = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    PrimerNombre = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    SegundoApellido = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    SegundoNombre = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    TelefonoContacto = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    ValorEstimadoSeguro = table.Column<decimal>(type: "numeric(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Asegurados", x => x.NumeroIdentificacion);
                });
        }
    }
}
