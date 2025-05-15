using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SearchServiceEngine.DTOs;
using SearchServiceEngine.Models;
using SearchServiceEngine.Repositories;
using SearchServiceEngine.Data;

namespace SearchServiceEngine.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _repository;
        private readonly IMapper _mapper;
        private readonly AppDbContext _db;
        public ContactService(IContactRepository repository, IMapper mapper, AppDbContext db)
        {
            _repository = repository;
            _mapper = mapper;
            _db = db;
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

        /// <summary>
        /// Crea un nuevo contacto y asocia los perfiles indicados en ProfileIds.
        /// </summary>
        /// <param name="dto">Datos del contacto a crear, incluyendo los IDs de perfiles a asociar.</param>
        /// <returns>El contacto creado con los perfiles asociados.</returns>
        public async Task<ContactDto?> CreateAsync(ContactCreateDto dto)
        {
            var c = _mapper.Map<Contact>(dto);
            if (c == null) throw new InvalidOperationException("Error mapping ContactCreateDto to Contact");
            c.CreatedAt = DateTime.UtcNow;
            c.UpdatedAt = DateTime.UtcNow;
            // Asociar perfiles
            if (dto.ProfileIds != null && dto.ProfileIds.Count > 0)
            {
                var profiles = await _db.Profiles.Where(p => dto.ProfileIds.Contains(p.Id)).ToListAsync();
                c.Profiles = profiles;
            }
            var created = await _repository.CreateAsync(c);
            if (created == null) return null;
            var result = _mapper.Map<ContactDto>(created);
            if (result == null) return null;
            return result;
        }

        /// <summary>
        /// Actualiza un contacto existente y sincroniza los perfiles según ProfileIds.
        /// </summary>
        /// <param name="id">ID del contacto a actualizar.</param>
        /// <param name="dto">Datos actualizados, incluyendo los IDs de perfiles a asociar.</param>
        /// <returns>True si la actualización fue exitosa, false si el contacto no existe.</returns>
        public async Task<bool> UpdateAsync(int id, ContactUpdateDto dto)
        {
            var c = await _repository.GetByIdAsync(id);
            if (c == null) return false;
            _mapper.Map(dto, c);
            c.UpdatedAt = DateTime.UtcNow;
            // Actualizar perfiles
            if (dto.ProfileIds != null)
            {
                c.Profiles.Clear();
                if (dto.ProfileIds.Count > 0)
                {
                    var profiles = await _db.Profiles.Where(p => dto.ProfileIds.Contains(p.Id)).ToListAsync();
                    foreach (var p in profiles)
                    {
                        c.Profiles.Add(p);
                    }
                }
            }
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

        public async Task<bool> AddProfileAsync(int contactId, int profileId)
        {
            var contact = await _repository.GetByIdAsync(contactId);
            if (contact == null) return false;
            if (contact.Profiles.Any(p => p.Id == profileId)) return false;
            var profile = await _db.Profiles.FirstOrDefaultAsync(p => p.Id == profileId);
            if (profile == null) return false;
            contact.Profiles.Add(profile);
            return await _repository.UpdateAsync(contact);
        }

        public async Task<bool> RemoveProfileAsync(int contactId, int profileId)
        {
            var contact = await _repository.GetByIdAsync(contactId);
            if (contact == null) return false;
            var profile = contact.Profiles.FirstOrDefault(p => p.Id == profileId);
            if (profile == null) return false;
            contact.Profiles.Remove(profile);
            return await _repository.UpdateAsync(contact);
        }
    }
}
