using SearchServiceEngine.Models;
using SearchServiceEngine.Data;
using Microsoft.EntityFrameworkCore;

namespace SearchServiceEngine.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly AppDbContext _context;
        public ContactRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetAllAsync(string? filter, int page, int pageSize)
        {
            var query = _context.Contacts.Include(c => c.Profiles).Include(c => c.Company).AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(c =>
                    c.FirstName.Contains(filter) ||
                    c.LastName.Contains(filter) ||
                    c.Document.Contains(filter) ||
                    c.Email.Contains(filter) ||
                    c.City.Contains(filter)
                );
            }
            return await query
                .OrderBy(c => c.FirstName + " " + c.LastName)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<int> CountAsync(string? filter)
        {
            var query = _context.Contacts.AsQueryable();
            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(c => c.FirstName.Contains(filter) || c.LastName.Contains(filter) || c.Document.Contains(filter));
            }
            return await query.CountAsync();
        }

        public async Task<Contact?> GetByIdAsync(int id)
        {
            return await _context.Contacts.Include(c => c.Profiles).Include(c => c.Company).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Contact> CreateAsync(Contact contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<bool> UpdateAsync(Contact contact)
        {
            _context.Contacts.Update(contact);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var c = await _context.Contacts.FindAsync(id);
            if (c == null) return false;
            _context.Contacts.Remove(c);
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<Contact> Query()
        {
            return _context.Contacts.AsQueryable();
        }
    }
}
