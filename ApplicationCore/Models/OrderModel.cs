using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.Models
{
    public class OrderModel
    {
        public OrderType OrderType { get; set; }

        public List<OrderDetailModel> OrderDetailModels { get; set; }
    }
}
