using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Offer : BaseEntity<long>
    {
        [StringLength(500), Required]
        public string Name { get; set; }
        public int Status { get; set; }
        [StringLength(450)]
        public string CustomerId { get; set; }
    }
}
