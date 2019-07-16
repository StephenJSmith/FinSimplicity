using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Angular7AspNetCore.Migrations
{
    public partial class AddedInvestmentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Investments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    InvestmentCode = table.Column<string>(nullable: false),
                    InvestmentName = table.Column<string>(nullable: false),
                    Market = table.Column<string>(nullable: false),
                    Currency = table.Column<string>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    PriceUpdatedUtc = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Investments", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Investments");
        }
    }
}
