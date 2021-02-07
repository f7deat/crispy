using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        [StringLength(450), Required]
        public string CreatedBy { get; set; }
        [StringLength(450), Required]
        public string ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public OrderType OrderType { get; set; }
        [StringLength(450), Required]
        public string CustomerId { get; set; }
        public int Tax { get; set; }
        [StringLength(1000)]
        public string ShipAddress { get; set; }
        [StringLength(1000)]
        public string Note { get; set; }
        public int Status { get; set; }
    }

    public enum OrderType
    {
        Import,
        Export
    }
}
