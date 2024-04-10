using API.Data;
using API.DTOs;
using API.Extensions;
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
            Basket basket = await RetrieveBasket(GetUserId());
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == GetUserId());

            if (basket == null || user == null) return NotFound();
            return basket.MapBasketToDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int serviceId)
        {
            var basket = await RetrieveBasket(GetUserId());

            if (basket == null) basket = CreateBasket();

            var service = await _context.Services.FindAsync(serviceId);

            if (service == null) return BadRequest(new ProblemDetails{ Title = "Service Not Found" });

            basket.AddItem(service);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            return BadRequest(new ProblemDetails{ Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int serviceId)
        {
            var basket = await RetrieveBasket(GetUserId());

            if (basket == null) return NotFound();

            basket.RemoveItem(serviceId);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails{ Title = "Problem removing item from the basket" });
        }

        private async Task<Basket> RetrieveBasket(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                Response.Cookies.Delete("userId");
                return null;
            }

            return await _context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(s => s.Service)
                        .FirstOrDefaultAsync(x => x.UserId == userId);
        }

        private string GetUserId()
        {
            return User.Identity?.Name;
        }

        private Basket CreateBasket()
        {
            var userId = User.Identity?.Name;
            var basket = new Basket{ UserId = userId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}