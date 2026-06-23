using TaskManagerAPI.DTOs.Tasks;

namespace TaskManagerAPI.Application.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetAllAsync();
}