using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Identity
{
    public class ApplicationUser : IdentityUser
    {
        [StringLength(200)]
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        [StringLength(500)]
        public string Avatar { get; set; }
        [Column(TypeName = "money")]
        public decimal Salary { get; set; }
        public string Social { get; set; }
        public DateTime HireDate { get; set; }
        [StringLength(1000)]
        public string Address { get; set; }
        [StringLength(450)]
        public string ManagerId { get; set; }
        public DateTime DateOfBirth { get; set; }
        [StringLength(20)]
        public string TaxIdentificationNumber { get; set; }
        public int PaidHolidays { get; set; }
    }
}
