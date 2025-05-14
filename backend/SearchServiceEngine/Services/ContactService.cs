using AutoMapper;
using SearchServiceEngine.DTOs;
using SearchServiceEngine.Models;
using SearchServiceEngine.Repositories;

namespace SearchServiceEngine.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _repository;
        private readonly IMapper _mapper;
        public ContactService(IContactRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContactDto>> GetAllAsync(string? filter, int page, int pageSize)
        {
            var contacts = await _repository.GetAllAsync(filter, page, pageSize);
            return _mapper.Map<IEnumerable<ContactDto>>(contacts);
        }

        public async Task<ContactDto?> GetByIdAsync(int id)
        {
            var c = await _repository.GetByIdAsync(id);
            return c == null ? null : _mapper.Map<ContactDto>(c);
        }

        public async Task<ContactDto?> CreateAsync(ContactCreateDto dto)
        {
            var c = _mapper.Map<Contact>(dto);
            if (c == null) throw new InvalidOperationException("Error mapping ContactCreateDto to Contact");
            c.CreatedAt = DateTime.UtcNow;
            c.UpdatedAt = DateTime.UtcNow;
            var created = await _repository.CreateAsync(c); // Si el repo lanza excepción, que se propague
            if (created == null) return null;
            var result = _mapper.Map<ContactDto>(created);
            if (result == null) return null;
            return result;
        }

        public async Task<bool> UpdateAsync(int id, ContactUpdateDto dto)
        {
            var c = await _repository.GetByIdAsync(id);
            if (c == null) return false;
            _mapper.Map(dto, c);
            c.UpdatedAt = DateTime.UtcNow;
            return await _repository.UpdateAsync(c);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<int> CountAsync(string? filter)
        {
            return await _repository.CountAsync(filter);
        }
    }
}
