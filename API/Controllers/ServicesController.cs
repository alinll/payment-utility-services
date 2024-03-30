using System.Text.Json;
using System.Text.Json.Serialization;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ServicesController : BaseApiController
    {
        private readonly ServiceContext _context;
        public ServicesController(ServiceContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Service>>> GetServices()
        {
            return await _context.Services.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Service>> GetService(int id)
        {
            Service service = await _context.Services.Include(i => i.Measure).FirstOrDefaultAsync(i => i.Id == id);

            if (service == null) return NotFound();

            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            string serviceJson = JsonSerializer.Serialize(service, options);

            Service serviceDeserialized = JsonSerializer.Deserialize<Service>(serviceJson, options);

            return serviceDeserialized;
        }
    }
}