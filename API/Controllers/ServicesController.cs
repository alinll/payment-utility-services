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
            var service = await _context.Services.FindAsync(id);

            if (service == null) return NotFound();

            return service;
        }
    }
}