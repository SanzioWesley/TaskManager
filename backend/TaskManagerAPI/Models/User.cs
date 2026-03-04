using Microsoft.AspNetCore.Identity;

namespace TaskManagerAPI.Models
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Relacionamento: Um usuário pode ter várias tarefas
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}