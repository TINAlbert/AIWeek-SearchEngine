using System.Threading.Tasks;
using SearchServiceEngine.Models;

namespace SearchServiceEngine.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task AddAsync(RefreshToken refreshToken);
        Task RevokeAsync(RefreshToken refreshToken);
        Task RemoveExpiredAsync();
        Task InvalidateAllAsync(string userId);
    }
}
