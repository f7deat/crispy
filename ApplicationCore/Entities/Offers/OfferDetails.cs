using System;
using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class OfferDetail : BaseEntity<Guid>
    {
        [StringLength(500)]
        public string Note { get; set; }
        public DateTime DeliveryDate { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string UnitName { get; set; }
        public string Code { get; set; }
        public long OfferId { get; set; }
    }
}
