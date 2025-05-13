using System;
using System.Security.Cryptography;
using System.Threading.Tasks;
using SearchServiceEngine.Models;
using SearchServiceEngine.Repositories;

namespace SearchServiceEngine.Services
{
    public class RefreshTokenService : IRefreshTokenService
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        public RefreshTokenService(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _refreshTokenRepository.GetByTokenAsync(token);
        }

        public async Task<RefreshToken> GenerateAsync(User user, string ipAddress)
        {
            var token = GenerateSecureToken();
            var refreshToken = new RefreshToken
            {
                Token = token,
                UserId = user.Id,
                Created = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7) // Configurable
            };
            await _refreshTokenRepository.AddAsync(refreshToken);
            return refreshToken;
        }

        public async Task RevokeAsync(RefreshToken refreshToken)
        {
            await _refreshTokenRepository.RevokeAsync(refreshToken);
        }

        public async Task RemoveExpiredAsync()
        {
            await _refreshTokenRepository.RemoveExpiredAsync();
        }

        public async Task InvalidateAllAsync(string userId)
        {
            await _refreshTokenRepository.InvalidateAllAsync(userId);
        }

        private string GenerateSecureToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
