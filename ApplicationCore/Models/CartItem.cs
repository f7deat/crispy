using System;

namespace ApplicationCore.Models
{
    public class CartItem
    {
        public Guid Id { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
    }
}
