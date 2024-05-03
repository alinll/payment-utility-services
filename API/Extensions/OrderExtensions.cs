using API.DTOs;
using API.Models.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> orders)
        {
            return orders.Select(order => new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                OrderStatus = order.OrderStatus.ToString(),
                OrderItems = order.OrderItems.Select(item => new OrderItemDto
                {
                    ServiceId = item.ItemOrdered.ServiceId,
                    Name = item.ItemOrdered.Name,
                    Price = item.Price,
                    PersonalAccountId = item.PersonalAccountId
                }).ToList()
            }).AsNoTracking();
        }
    }
}