using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.DTOs.Auth;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto model)
    {
        var result = await _authService.Register(model);

        if (!result.Success)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto model)
    {
        var result = await _authService.Login(model);

        if (!result.Success)
            return Unauthorized(result);

        return Ok(result);
    }
}