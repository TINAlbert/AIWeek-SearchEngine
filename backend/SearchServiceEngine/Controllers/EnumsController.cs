using Microsoft.AspNetCore.Mvc;
using SearchServiceEngine.Models;

namespace SearchServiceEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class EnumsController : ControllerBase
    {
        /// <summary>
        /// Devuelve los valores posibles del enum ContactStatus.
        /// </summary>
        [HttpGet]
        public IActionResult ContactStatus()
        {
            var values = System.Enum.GetValues(typeof(ContactStatus))
                .Cast<ContactStatus>()
                .Select(e => new { value = (int)e, name = e.ToString() })
                .ToList();
            return Ok(values);
        }
    }
}
