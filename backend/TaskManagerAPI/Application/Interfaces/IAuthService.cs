using TaskManagerAPI.DTOs;

namespace TaskManagerAPI.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> Register(RegisterDto model);
        Task<AuthResponseDto> Login(LoginDto model);
    }
}