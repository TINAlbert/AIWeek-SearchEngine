using FluentValidation;

namespace SearchServiceEngine.DTOs
{
    /// <summary>
    /// Validador para la creación de un nuevo usuario.
    /// </summary>
    public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateDtoValidator()
        {
            RuleFor(x => x.UserName)
                .NotEmpty().WithMessage("El nombre de usuario es obligatorio.")
                .MinimumLength(3).WithMessage("El nombre de usuario debe tener al menos 3 caracteres.")
                .MaximumLength(30).WithMessage("El nombre de usuario no debe superar los 30 caracteres.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("La contraseña es obligatoria.")
                .MinimumLength(6).WithMessage("La contraseña debe tener al menos 6 caracteres.")
                .Matches("[A-Z]").WithMessage("La contraseña debe contener al menos una mayúscula.")
                .Matches("[a-z]").WithMessage("La contraseña debe contener al menos una minúscula.")
                .Matches("[0-9]").WithMessage("La contraseña debe contener al menos un número.");

            RuleFor(x => x.Role)
                .NotEmpty().WithMessage("El rol es obligatorio.")
                .Must(r => r == "User" || r == "Admin")
                .WithMessage("El rol debe ser 'User' o 'Admin'.");
        }
    }
}
