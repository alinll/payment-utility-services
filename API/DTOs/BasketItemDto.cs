using API.Models;

namespace API.DTOs
{
    public class BasketItemDto
    {
        public int ServiceId { get; set; }
        public int PersonalAccountId { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public decimal PriceIndividual { get; set; }
        public decimal PriceLegal { get; set; }
        public decimal? Price { get; set; }
        public bool HasCounter { get; set; }
        public PersonalAccount PersonalAccount { get; set; }
    }
}