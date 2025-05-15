using AutoMapper;
using SearchServiceEngine.Models;
using SearchServiceEngine.DTOs;

namespace SearchServiceEngine.DTOs
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactDto>()
                .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.Company != null ? src.Company.Name : null))
                .ForMember(dest => dest.Profiles, opt => opt.MapFrom(src => src.Profiles));
            CreateMap<ContactDto, Contact>();
            CreateMap<Contact, ContactCreateDto>().ReverseMap();
            CreateMap<Contact, ContactUpdateDto>().ReverseMap();
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<Company, CompanyCreateDto>().ReverseMap();
            CreateMap<Company, CompanyUpdateDto>().ReverseMap();
            CreateMap<Models.Profile, ProfileDto>().ReverseMap();
            CreateMap<Models.Profile, ProfileCreateDto>().ReverseMap();
            CreateMap<Models.Profile, ProfileUpdateDto>().ReverseMap();
        }
    }
}
