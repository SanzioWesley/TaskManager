using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs.Tasks;
using TaskManagerAPI.Models;

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

        public async Task<TaskDto> CreateAsync(TaskDto dto, int userId) // Mudou o tipo aqui
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                CreatedAt = DateTime.UtcNow,
                UserId = userId,
                IsCompleted = false
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            dto.Id = task.Id;
            return dto;
        }

        public async Task<TaskDto?> GetByIdAsync(int id, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return null;

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                CreatedAt = task.CreatedAt,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                UserId = task.UserId
            };
        }

        public async Task<bool> UpdateAsync(int id, TaskDto dto, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return false;

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.DueDate = dto.DueDate;
            task.IsCompleted = dto.IsCompleted;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ToggleCompleteAsync(int id, int userId)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (task == null) return false;

            task.IsCompleted = !task.IsCompleted;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}