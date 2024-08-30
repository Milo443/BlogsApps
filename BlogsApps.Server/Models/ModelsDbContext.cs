using Microsoft.EntityFrameworkCore;

namespace BlogsApps.Server.Models
{
    public class ModelsDbContext : DbContext
    {
        public ModelsDbContext(DbContextOptions<ModelsDbContext> options) : base(options)
        {

        }

        public DbSet<Comments> Comments { get; set; }
        public DbSet<LikedPosts> LikedPosts { get; set; }
        public DbSet<Posts> Posts { get; set; }
        public DbSet<Ratings> Ratings { get; set; }
        public DbSet<Users> Users { get; set; }
    }
}
