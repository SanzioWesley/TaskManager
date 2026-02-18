using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;  // <- Valor padrão

        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;  // <- Valor padrão

        [Required]
        public string PasswordHash { get; set; } = string.Empty;  // <- Valor padrão

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Inicializa a coleção para evitar null
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}