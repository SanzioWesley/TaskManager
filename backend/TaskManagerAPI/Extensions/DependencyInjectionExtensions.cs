using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.Application.Services;
using TaskManagerAPI.Infrastructure.Services;

namespace TaskManagerAPI.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ITaskService, TaskService>();

            return services;
        }
    }
}