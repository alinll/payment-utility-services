namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public List<decimal> Price { get; set; }
    }
}