using API.Models;
using API.Models.OrderAggregate;
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
        public DbSet<PersonalAccount> PersonalAccounts { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}