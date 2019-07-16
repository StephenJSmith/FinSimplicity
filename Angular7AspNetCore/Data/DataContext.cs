using Angular7AspNetCore.Models;
using Microsoft.EntityFrameworkCore;

namespace Angular7AspNetCore.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Investment> Investments { get; set; }
    }
}
