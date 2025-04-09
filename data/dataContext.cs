using FitnessTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.Data {
    public class DataContext : DbContext {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<TrainingProgram> TrainingPrograms { get; set; }
        public DbSet<Exercise> Exercises { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>(entity => {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.FirstName).IsRequired();
                entity.Property(u => u.LastName).IsRequired();
                entity.Property(u => u.PasswordHash).IsRequired();
                entity.HasMany(u => u.TrainingPrograms)
                      .WithMany(tp => tp.Users);
            });
            modelBuilder.Entity<Exercise>(entity => {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.Property(e => e.Agonist).IsRequired();
                entity.Property(e => e.Description).IsRequired();
                entity.HasMany(e => e.TrainingPrograms).WithMany(tp => tp.Exercises);
            });
            modelBuilder.Entity<TrainingProgram>(entity => {
                entity.HasKey(tp => tp.Id);
                entity.Property(tp => tp.Name).IsRequired();
                entity.HasMany(tp => tp.Exercises).WithMany(e => e.TrainingPrograms);
                entity.HasMany(tp => tp.Users).WithMany(u => u.TrainingPrograms);
            });
        }
    }
}