namespace API.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public decimal Price { get; set; }
        public int MeasureId { get; set; }
        public Measure Measure { get; set; }
    }
}