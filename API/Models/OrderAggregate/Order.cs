namespace API.Models.OrderAggregate
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; }
        public decimal? Total { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    }
}