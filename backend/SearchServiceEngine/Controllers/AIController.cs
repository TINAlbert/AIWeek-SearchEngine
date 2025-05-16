using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace SearchServiceEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Tags("AI")]
    [Authorize]
    public class AIController : ControllerBase
    {
        [HttpPost("generate-sql")]
        public async Task<IActionResult> GenerateSql([FromBody] AIQueryRequest request)
        {
            var httpClient = new HttpClient();
            var ollamaUrl = "http://localhost:11434/api/generate";
            // Estructura del modelo de datos en formato SQL
            var schema = @"CREATE TABLE Companies (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Address TEXT,
    City TEXT,
    Country TEXT,
    Phone TEXT
);

CREATE TABLE Contacts (
    Id INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Document TEXT,
    Email TEXT,
    Phone TEXT,
    Address TEXT,
    City TEXT,
    Status TEXT,
    CreatedAt DATETIME,
    UpdatedAt DATETIME,
    CompanyId INTEGER,
    FOREIGN KEY (CompanyId) REFERENCES Companies(Id)
);

CREATE TABLE Profiles (
    Id INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT
);

CREATE TABLE ContactProfiles (
    ContactsId INTEGER,
    ProfilesId INTEGER,
    PRIMARY KEY (ContactsId, ProfilesId),
    FOREIGN KEY (ContactsId) REFERENCES Contacts(Id),
    FOREIGN KEY (ProfilesId) REFERENCES Profiles(Id)
);
";
            var prompt = $"Genera solo una consulta SQL para la siguiente petición de usuario, sin explicaciones ni comentarios.\nPetición: {request.Prompt}\n\nEstructura de la base de datos (formato SQL):\n{schema}";
            Console.WriteLine($"[AIController] Prompt generado:\n{prompt}");
            var body = new
            {
                model = "llama3",
                prompt = prompt
            };
            var json = JsonSerializer.Serialize(body);
            var response = await httpClient.PostAsync(ollamaUrl, new StringContent(json, Encoding.UTF8, "application/json"));
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, error);
            }
            var responseString = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"[AIController] Respuesta de Ollama:\n{responseString}");
            // Ollama puede devolver varias líneas JSON (streaming). Tomamos la última línea válida.
            string sql = string.Empty;
            try
            {
                var lines = responseString.Split('\n').Where(l => !string.IsNullOrWhiteSpace(l));
                foreach (var line in lines)
                {
                    Console.WriteLine($"[AIController] Línea de respuesta de Ollama: {line}");
                    var obj = JsonSerializer.Deserialize<OllamaResponse>(line);
                    if (obj?.response != null)
                        sql += obj.response;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[AIController] Error deserializando respuesta de Ollama: {ex.Message}");
            }
            // Normalizar saltos de línea dobles y espacios finales
            sql = sql.Replace("\\n", "\n").Replace("\r\n", "\n");
            // Ejecutar la SQL generada si es un SELECT
            Console.WriteLine($"[AIController] SQL generada:\n{sql}");
            object? resultData = null;
            if (!string.IsNullOrWhiteSpace(sql) && sql.TrimStart().StartsWith("SELECT", System.StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    using var db = new Data.AppDbContext(HttpContext.RequestServices.GetService<Microsoft.EntityFrameworkCore.DbContextOptions<Data.AppDbContext>>()!);
                    using var command = db.Database.GetDbConnection().CreateCommand();
                    command.CommandText = sql;
                    db.Database.OpenConnection();
                    using var reader = command.ExecuteReader();
                    var results = new List<Dictionary<string, object>>();
                    while (reader.Read())
                    {
                        var row = new Dictionary<string, object>();
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            row[reader.GetName(i)] = reader.IsDBNull(i) ? null : reader.GetValue(i);
                        }
                        results.Add(row);
                    }
                    resultData = results;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[AIController] Error ejecutando SQL: {ex.Message}");
                    return BadRequest(new { sql, error = ex.Message });
                }
            }
            return Ok(new { sql, data = resultData });
        }

        [HttpGet("ping")]
        public async Task<IActionResult> Ping()
        {
            var httpClient = new HttpClient();
            var ollamaUrl = "http://localhost:11434/api/generate";
            var body = new
            {
                model = "llama3",
                prompt = "PING PARA VER ESTADO DEL SERVICIO"
            };
            var json = JsonSerializer.Serialize(body);
            try
            {
                var response = await httpClient.PostAsync(ollamaUrl, new StringContent(json, Encoding.UTF8, "application/json"));
                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode(503, new { status = "error", message = "No se pudo conectar con el servicio de IA (Ollama)." });
                }
                return Ok(new { status = "ok", message = "Conectado con el servicio de IA (Ollama)." });
            }
            catch (Exception ex)
            {
                return StatusCode(503, new { status = "error", message = $"No se pudo conectar con el servicio de IA (Ollama): {ex.Message}" });
            }
        }
    }

    public class AIQueryRequest
    {
        public string Prompt { get; set; } = string.Empty;
    }

    public class OllamaResponse
    {
        public string response { get; set; } = string.Empty;
    }
}
