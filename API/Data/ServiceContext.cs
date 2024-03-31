using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ServiceContext : IdentityDbContext<User>
    {
        public ServiceContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Measure> Measures { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Basket> Baskets { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole{ Name = "Individual", NormalizedName = "INDIVIDUAL" },
                new IdentityRole{ Name = "Legal", NormalizedName = "LEGAL" },
                new IdentityRole{ Name = "Admin", NormalizedName = "ADMIN" }
            );
        }
    }
}