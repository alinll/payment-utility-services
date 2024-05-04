using API.Data;
using API.DTOs;
using API.Extensions;
using API.Models.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly ServiceContext _context;
        public OrdersController(ServiceContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(x => x.UserId == User.Identity.Name)
            .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
            .ProjectOrderToOrderDto()
            .Where(x => x.UserId == User.Identity.Name)
            .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder()
        {
            var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails { Title = "Не вдалося знайти кошик" });

            var items = new List<OrderItem>();

            foreach(var item in basket.Items)
            {
                var serviceItem = await _context.Services.FindAsync(item.ServiceId);

                var personalAccount = await _context.PersonalAccounts
                .Include(a => a.Address)
                .Include(s => s.Service)
                .Where(u => u.Address.UserId == User.Identity.Name)
                .FirstOrDefaultAsync(s => s.ServiceId == item.ServiceId);

                var itemOrdered = new ServiceItemOrdered
                {
                    ServiceId = serviceItem.Id,
                    Name = serviceItem.Name
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    PersonalAccountId = personalAccount.Id,
                    Price = personalAccount.Price
                };

                items.Add(orderItem);
            }

            var total = items.Sum(item => item.Price);

            var order = new Order
            {
                OrderItems = items,
                UserId = User.Identity.Name,
                Total = total
            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest("Проблема при створенні замовлення");
        }
    }
}