using Microsoft.AspNetCore.Identity;

namespace SearchServiceEngine.Models
{
    public class User : IdentityUser
    {
        public string Role { get; set; } = string.Empty;
    }
}
