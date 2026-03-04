using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Senha é obrigatória")]
        [MinLength(6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres")]
        public string Password { get; set; } = string.Empty;
    }
}