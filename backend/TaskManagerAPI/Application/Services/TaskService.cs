using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs.Tasks;

namespace TaskManagerAPI.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskDto>> GetAllAsync()
        {
            return await _context.Tasks
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt,
                    DueDate = t.DueDate,
                    IsCompleted = t.IsCompleted,
                    UserId = t.UserId
                })
                .ToListAsync();
        }
    }
}