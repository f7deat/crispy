using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApplicationCore.Entities
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }
        [StringLength(500)]
        public string Name { get; set; }
        [StringLength(1000)]
        public string Description { get; set; }
        public string Content { get; set; }
        [Column(TypeName = "money")]
        public decimal? UnitPrice { get; set; }
        public int UnitStock { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime ModifiedDate { get; set; }
        [Column(TypeName = "money")]
        public decimal? SalePrice { get; set; }
        [Column(TypeName = "money")]
        public decimal? RegularPrice { get; set; }
        [StringLength(500)]
        public string Thumbnail { get; set; }
        [StringLength(450)]
        public string CreatedBy { get; set; }
        [StringLength(450)]
        public string Modifiedby { get; set; }
    }
}
