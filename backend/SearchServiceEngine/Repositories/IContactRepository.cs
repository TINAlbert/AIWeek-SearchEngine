using SearchServiceEngine.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SearchServiceEngine.Repositories
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetAllAsync(string? filter, int page, int pageSize);
        Task<Contact?> GetByIdAsync(int id);
        Task<Contact> CreateAsync(Contact contact);
        Task<bool> UpdateAsync(Contact contact);
        Task<bool> DeleteAsync(int id);
    }
}
