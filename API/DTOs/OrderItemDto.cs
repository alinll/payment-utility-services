using API.Models;

namespace API.DTOs
{
    public class OrderItemDto
    {
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public int PersonalAccountId { get; set; }
        public PersonalAccount PersonalAccount { get; set; }
    }
}