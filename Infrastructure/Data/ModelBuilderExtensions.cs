using ApplicationCore.Constants;
using Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationRole>().HasData(
                new ApplicationRole { Name = CRole.ADMIN },
                new ApplicationRole { Name = CRole.CUSTOMER }
            );
        }
    }
}
