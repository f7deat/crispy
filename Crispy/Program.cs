using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Crispy
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        // 103.216.113.32;Database=defzonen_data;User Id=defzonen_user;Password=21Hfe?6u;Trusted_Connection=False;MultipleActiveResultSets=true
        // LAPTOP-IIRBIRMG\\SQLEXPRESS;Database=CrispyDb;Trusted_Connection=True;MultipleActiveResultSets=true
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
