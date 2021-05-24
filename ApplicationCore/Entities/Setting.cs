using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Setting
    {
        [Key]
        public string Key { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        [StringLength(450)]
        public string CreatedBy { get; set; }
        [StringLength(450)]
        public string ModifiedBy { get; set; }
        public bool IsVisible { get; set; }
    }
}
