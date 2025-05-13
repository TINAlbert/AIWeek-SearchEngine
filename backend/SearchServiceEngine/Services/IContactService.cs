using SearchServiceEngine.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SearchServiceEngine.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ContactDto>> GetAllAsync(string? filter, int page, int pageSize);
        Task<ContactDto?> GetByIdAsync(int id);
        Task<ContactDto> CreateAsync(ContactCreateDto dto);
        Task<bool> UpdateAsync(int id, ContactUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
