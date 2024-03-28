using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ServiceContext : DbContext
    {
        public ServiceContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Measure> Measures { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}