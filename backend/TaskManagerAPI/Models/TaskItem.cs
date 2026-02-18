using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerAPI.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? DueDate { get; set; }

        public bool IsCompleted { get; set; } = false;

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }  // Pode ser nullable na navegação
    }
}