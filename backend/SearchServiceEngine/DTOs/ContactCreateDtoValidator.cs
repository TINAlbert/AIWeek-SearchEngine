using FluentValidation;
using SearchServiceEngine.Models;

namespace SearchServiceEngine.DTOs
{
    public class ContactCreateDtoValidator : AbstractValidator<ContactCreateDto>
    {
        public ContactCreateDtoValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Document).MaximumLength(50);
            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(150);
            RuleFor(x => x.Phone).MaximumLength(30);
            RuleFor(x => x.Address).MaximumLength(200);
            RuleFor(x => x.Status)
                .IsInEnum()
                .WithMessage("Status debe ser un valor válido del enum ContactStatus");
            RuleFor(x => x.CompanyId).GreaterThan(0).When(x => x.CompanyId.HasValue);
        }
    }
}
