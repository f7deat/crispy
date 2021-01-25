using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Identity
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
    }
}
