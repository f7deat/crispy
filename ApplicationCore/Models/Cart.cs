using ApplicationCore.Entities;
using System.Collections.Generic;

namespace ApplicationCore.Models
{
    public class Cart
    {
        public string CustomerId { get; set; }
        public OrderType OrderType { get; set; }
        public List<CartItem> CartItems { get; set; }
    }
}
