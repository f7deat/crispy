using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    public class OrderDetailModel
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
    }
}
