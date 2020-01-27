using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LingiWebApplication.Data.Migrations
{
    public partial class _002 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppQuizzes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TestId = table.Column<int>(nullable: false),
                    Question = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppQuizzes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppQuizAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    QuizId = table.Column<int>(nullable: false),
                    Answer = table.Column<string>(nullable: false),
                    Correct = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppQuizAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppQuizAnswers_AppQuizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "AppQuizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppQuizAnswers_QuizId",
                table: "AppQuizAnswers",
                column: "QuizId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppQuizAnswers");

            migrationBuilder.DropTable(
                name: "AppQuizzes");
        }
    }
}
