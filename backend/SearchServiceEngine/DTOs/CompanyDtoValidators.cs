using FluentValidation;

namespace SearchServiceEngine.DTOs
{
    public class CompanyCreateDtoValidator : AbstractValidator<CompanyCreateDto>
    {
        public CompanyCreateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.Address).MaximumLength(200);
            RuleFor(x => x.City).MaximumLength(100);
            RuleFor(x => x.Country).MaximumLength(100);
            RuleFor(x => x.Phone).MaximumLength(50);
        }
    }

    public class CompanyUpdateDtoValidator : AbstractValidator<CompanyUpdateDto>
    {
        public CompanyUpdateDtoValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.Address).MaximumLength(200);
            RuleFor(x => x.City).MaximumLength(100);
            RuleFor(x => x.Country).MaximumLength(100);
            RuleFor(x => x.Phone).MaximumLength(50);
        }
    }
}
