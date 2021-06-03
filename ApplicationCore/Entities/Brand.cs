namespace ApplicationCore.Entities
{
    public class Brand : BaseEntity<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int ParrentId { get; set; }
        public string Logo { get; set; }
    }
}
