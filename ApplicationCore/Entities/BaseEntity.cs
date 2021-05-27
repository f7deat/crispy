using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public abstract class BaseEntity<T>
    {
        [Key]
        public T Id { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        [StringLength(450), Required]
        public string CreatedBy { get; set; }
        [StringLength(450)]
        public string ModifiedBy { get; set; }
    }
}
