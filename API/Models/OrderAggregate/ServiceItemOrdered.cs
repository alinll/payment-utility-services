using Microsoft.EntityFrameworkCore;

namespace API.Models.OrderAggregate
{
    [Owned]
    public class ServiceItemOrdered
    {
        public int ServiceId { get; set; }
        public string Name { get; set; }
    }
}