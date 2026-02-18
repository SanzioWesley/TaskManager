using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Índice único para email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // CORREÇÃO: Configurar relacionamento corretamente
            modelBuilder.Entity<TaskItem>()
                .HasOne(t => t.User)  // TaskItem tem uma propriedade User
                .WithMany(u => u.Tasks)  // User tem uma coleção Tasks
                .HasForeignKey(t => t.UserId)  // Chave estrangeira
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}