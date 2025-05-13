using FluentValidation;

namespace SearchServiceEngine.DTOs
{
    public class ContactCreateDtoValidator : AbstractValidator<ContactCreateDto>
    {
        public ContactCreateDtoValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Document).NotEmpty().MaximumLength(20);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Phone).MaximumLength(20);
            RuleFor(x => x.Address).MaximumLength(100);
            RuleFor(x => x.Status).NotEmpty().MaximumLength(20);
        }
    }
}
