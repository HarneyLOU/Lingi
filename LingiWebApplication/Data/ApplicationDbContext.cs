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

            modelBuilder.Entity<ApplicationUser>().ToTable("AppUsers");
            modelBuilder.Entity<ApplicationUser>().HasMany(u => u.Tests).WithOne(i => i.User);
            modelBuilder.Entity<ApplicationUser>().HasOne(u => u.Language).WithMany(i => i.Users);

            modelBuilder.Entity<Type>().ToTable("AppTypes");
            modelBuilder.Entity<Type>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Type>().HasMany(c => c.Tests).WithOne(e => e.Type);

            modelBuilder.Entity<Level>().ToTable("AppLevels");
            modelBuilder.Entity<Level>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Level>().HasMany(c => c.Tests).WithOne(e => e.Level);

            modelBuilder.Entity<Language>().ToTable("AppLanguages");
            modelBuilder.Entity<Language>().Property(i => i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Language>().HasMany(c => c.Tests).WithOne(e => e.Language);

            modelBuilder.Entity<Test>().ToTable("AppTests");
            modelBuilder.Entity<Test>().Property(i => i.Id).ValueGeneratedOnAdd();
            //modelBuilder.Entity<Test>().HasOne(c => c.Language).WithMany(e => e.Tests);

            modelBuilder.Entity<Flashcard>().ToTable("AppFlashcards");
            modelBuilder.Entity<Flashcard>().Property(i => i.Id).ValueGeneratedOnAdd();
        }

        public DbSet<Type> Types { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Flashcard> Flashcards { get; set; }
    }
}
