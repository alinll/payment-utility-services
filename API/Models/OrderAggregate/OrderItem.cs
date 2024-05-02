namespace API.Models.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }
        public ServiceItemOrdered ItemOrdered { get; set; }
        public decimal? Price { get; set; }
        public int PersonalAccountId { get; set; }
        public PersonalAccount PersonalAccount { get; set; }
    }
}