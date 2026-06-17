using Microsoft.AspNetCore.Identity;
using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.DTOs;
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
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                UserName = model.Email,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = string.Join(", ", result.Errors.Select(e => e.Description))
                };
            }

            await _userManager.AddToRoleAsync(user, "User");

            var token = await _tokenService.GenerateToken(user);

            return new AuthResponseDto
            {
                Success = true,
                Message = "Usuário criado",
                Token = token,
                Email = user.Email!,
                Name = user.Name,
                UserId = user.Id,
                Expiration = DateTime.UtcNow.AddHours(2)
            };
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

            var token = await _tokenService.GenerateToken(user);

            return new AuthResponseDto
            {
                Success = true,
                Message = "Login OK",
                Token = token,
                Email = user.Email!,
                Name = user.Name,
                UserId = user.Id,
                Expiration = DateTime.UtcNow.AddHours(2)
            };
        }
    }
}