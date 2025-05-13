using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SearchServiceEngine.Data;
using SearchServiceEngine.Models;

namespace SearchServiceEngine.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly AppDbContext _context;
        public RefreshTokenRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _context.RefreshTokens.Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Token == token);
        }

        public async Task AddAsync(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task RevokeAsync(RefreshToken refreshToken)
        {
            refreshToken.Revoked = DateTime.UtcNow;
            _context.RefreshTokens.Update(refreshToken);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveExpiredAsync()
        {
            var expired = await _context.RefreshTokens
                .Where(r => r.Expires <= DateTime.UtcNow || r.Revoked != null)
                .ToListAsync();
            if (expired.Count > 0)
            {
                _context.RefreshTokens.RemoveRange(expired);
                await _context.SaveChangesAsync();
            }
        }

        public async Task InvalidateAllAsync(string userId)
        {
            var tokens = await _context.RefreshTokens.Where(r => r.UserId == userId && r.Revoked == null && r.Expires > DateTime.UtcNow).ToListAsync();
            if (tokens.Count > 0)
            {
                _context.RefreshTokens.RemoveRange(tokens);
                await _context.SaveChangesAsync();
            }
        }
    }
}
