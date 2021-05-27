using System;

namespace ApplicationCore.Entities
{
    public class Category : BaseEntity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public CategoryStatus Status { get; set; }
        public int ParrentId { get; set; }
        public string Thumbnail { get; set; }
    }

    public enum CategoryStatus
    {
        IN_ACTIVE,
        ACTIVE
    }
}
