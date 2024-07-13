using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Address> Addresses { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<Order>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<Address>()
                .HasKey(a => a.Id);

            modelBuilder.Ignore<FaultModel>();
        }
    }
}
