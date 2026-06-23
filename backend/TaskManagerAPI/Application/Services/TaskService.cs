using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.DTOs.Tasks;
using TaskManagerAPI.Data;

namespace TaskManagerAPI.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public Task<IEnumerable<TaskDto>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
    
}