using Microsoft.AspNetCore.Identity;
using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.DTOs.Auth;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task<AuthResponseDto> Register(RegisterDto model)
        {
            var existingUser = await _userManager.FindByEmailAsync(model.Email);

            if (existingUser != null)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Este email já está em uso"
                };
            }

            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                UserName = model.Email,
                CreatedAt = DateTime.UtcNow
            };

            var createResult = await _userManager.CreateAsync(user, model.Password);

            if (!createResult.Succeeded)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = string.Join(", ", createResult.Errors.Select(e => e.Description))
                };
            }

            var roleResult = await _userManager.AddToRoleAsync(user, "User");

            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);

                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Erro ao associar perfil ao usuário"
                };
            }

            return await BuildSuccessResponse(user, "Usuário criado");
        }

        public async Task<AuthResponseDto> Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Email ou senha inválidos"
                };
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (!result.Succeeded)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = "Email ou senha inválidos"
                };
            }

            return await BuildSuccessResponse(user, "Login OK");
        }

        private async Task<AuthResponseDto> BuildSuccessResponse(User user, string message)
        {
            var token = await _tokenService.GenerateToken(user);

            return new AuthResponseDto
            {
                Success = true,
                Message = message,
                Token = token,
                Email = user.Email!,
                Name = user.Name,
                UserId = user.Id,
                Expiration = DateTime.UtcNow.AddHours(2)
            };
        }
    }
}