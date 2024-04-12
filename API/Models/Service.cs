namespace API.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public decimal PriceIndividual { get; set; }
        public decimal PriceLegal { get; set; }
        public bool HasCounter { get; set; }
        public int MeasureId { get; set; }
        public Measure Measure { get; set; }
    }
}