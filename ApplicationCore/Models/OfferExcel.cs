using System;

namespace ApplicationCore.Models
{
    public class OfferExcel
    {
        public string ProductName { get; set; }
        public string CustomerName { get; set; }
        public int Quantity { get; set; }
        public int UnitInStock { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Note { get; set; }
        public DateTime DeliveryDate { get; set; }
        public decimal? UnitPrice { get; set; }
    }
}