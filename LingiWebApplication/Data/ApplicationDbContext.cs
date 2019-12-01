using LingiWebApplication.Data.Models;
using LingiWebApplication.Data.Models.Tests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LingiWebApplication.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Tests).WithOne(i => i.User);

            modelBuilder.Entity<Category>().ToTable("Categories");
            modelBuilder.Entity<Category>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Category>().HasMany(c => c.Tests).WithOne(e => e.Category);

            modelBuilder.Entity<Level>().ToTable("Levels");
            modelBuilder.Entity<Level>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Level>().HasMany(c => c.Tests).WithOne(e => e.Level);

            modelBuilder.Entity<Language>().ToTable("Languages");
            modelBuilder.Entity<Language>().Property(i => i.Id).ValueGeneratedOnAdd();
            //modelBuilder.Entity<Language>().HasMany(c => c.Tests).WithOne(e => e.Language);

            modelBuilder.Entity<Test>().ToTable("Tests");
            modelBuilder.Entity<Test>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Test>().HasOne(c => c.Language).WithMany(e => e.Tests);

            modelBuilder.Entity<Flashcard>().ToTable("Flashcards");
            modelBuilder.Entity<Flashcard>().Property(i => i.Id).ValueGeneratedOnAdd();
            //chyba trzeba zamienić na test hasmany flashcards
        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Flashcard> Flashcards { get; set; }
    }
}
