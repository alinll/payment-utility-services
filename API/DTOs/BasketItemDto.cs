namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public decimal Price { get; set; }
    }
}