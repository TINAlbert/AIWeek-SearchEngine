namespace SearchServiceEngine.Request
{
    /// <summary>
    /// DTO para la acción de login, contiene únicamente usuario y contraseña.
    /// </summary>
    public class LoginRequest
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
