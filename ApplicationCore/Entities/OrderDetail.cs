using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class OrderDetail
    {
        [Key]
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
        public Guid ProductId { get; set; }
    }
}
