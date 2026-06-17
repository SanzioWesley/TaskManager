using TaskManagerAPI.Models;

namespace TaskManagerAPI.Application.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateToken(User user);
    }
}