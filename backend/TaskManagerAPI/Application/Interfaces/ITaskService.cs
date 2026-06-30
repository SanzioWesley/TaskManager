using TaskManagerAPI.DTOs.Tasks; // Verifique se o caminho está certo

namespace TaskManagerAPI.Application.Interfaces
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllAsync();
        Task<TaskDto?> GetByIdAsync(int id, int userId);
        Task<TaskDto> CreateAsync(TaskDto dto, int userId); // Aqui mudou
        Task<bool> UpdateAsync(int id, TaskDto dto, int userId); // Aqui também
        Task<bool> DeleteAsync(int id, int userId);
        Task<bool> ToggleCompleteAsync(int id, int userId);
    }
}