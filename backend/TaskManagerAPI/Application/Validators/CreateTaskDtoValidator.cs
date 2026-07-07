using FluentValidation;
using TaskManagerAPI.DTOs.Tasks;

namespace TaskManagerAPI.Application.Validators
{
    public class CreateTaskDtoValidator : AbstractValidator<TaskDto>
    {
        public CreateTaskDtoValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("O título é obrigatório.")
                .MinimumLength(3).WithMessage("O título deve ter pelo menos 3 caracteres.")
                .MaximumLength(100).WithMessage("O título não pode passar de 100 caracteres.");

            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("A descrição não pode passar de 500 caracteres.");

            RuleFor(x => x.DueDate)
                .GreaterThan(DateTime.UtcNow).WithMessage("A data de entrega deve ser no futuro.");
        }
    }
}