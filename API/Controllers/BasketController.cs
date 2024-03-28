using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly ServiceContext _context;
        public BasketController(ServiceContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int serviceId)
        {
            var basket = await RetrieveBasket();

            if (basket == null) basket = CreateBasket();

            var service = await _context.Services.FindAsync(serviceId);

            if (service == null) return BadRequest(new ProblemDetails{ Title = "Service Not Found" });

            basket.AddItem(service);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{ Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int serviceId)
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            basket.RemoveItem(serviceId);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails{ Title = "Problem removing item from the basket" });
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(s => s.Service)
                        .FirstOrDefaultAsync(x => x.UserId == Request.Cookies["userId"]);
        }

        private Basket CreateBasket()
        {
            var userId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{ IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("userId", userId, cookieOptions);
            var basket = new Basket{ UserId = userId };
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                UserId = basket.UserId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ServiceId = item.ServiceId,
                    Name = item.Service.Name,
                    PictureUrl = item.Service.PictureUrl,
                    Price = new List<decimal>(item.Service.Price)
                }).ToList()
            };
        }
    }
}