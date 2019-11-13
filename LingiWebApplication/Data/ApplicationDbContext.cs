using LingiWebApplication.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace LingiWebApplication.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
        }

        public DbSet<ApplicationUser> Users { get; set; }
    }
}
