namespace TaskManagerAPI.DTOs
{
    public class TaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty; // Só o nome, não o objeto inteiro
    }
}