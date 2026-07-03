using TaskManagerAPI.DTOs.Auth;

namespace TaskManagerAPI.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> Login(LoginDto model);
        Task<AuthResponseDto> Register(RegisterDto model);
    }
}