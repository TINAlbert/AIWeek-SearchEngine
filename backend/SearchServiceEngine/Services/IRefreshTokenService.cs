using System.Threading.Tasks;
using SearchServiceEngine.Models;

namespace SearchServiceEngine.Services
{
    public interface IRefreshTokenService
    {
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task<RefreshToken> GenerateAsync(User user, string ipAddress);
        Task RevokeAsync(RefreshToken refreshToken);
        Task RemoveExpiredAsync();
        Task InvalidateAllAsync(string userId);
    }
}
