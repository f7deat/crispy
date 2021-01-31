using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Identity
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(200)]
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        [StringLength(500)]
        public string Avatar { get; set; }
    }
}
