using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.Tasks
                .Include(t => t.User)  // Inclui dados do usuário
                .ToListAsync();
        }

        // GET: api/tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _context.Tasks
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // GET: api/tasks/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasksByUser(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .Include(t => t.User)
                .ToListAsync();
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTask(TaskItem task)
        {
            // Verificar se o usuário existe
            var user = await _context.Users.FindAsync(task.UserId);
            if (user == null)
            {
                return BadRequest("Usuário não encontrado");
            }

            task.CreatedAt = DateTime.UtcNow;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskItem task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PATCH: api/tasks/5/complete
        [HttpPatch("{id}/complete")]
        public async Task<IActionResult> CompleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.IsCompleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}