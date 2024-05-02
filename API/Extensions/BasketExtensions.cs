using System.Text.Json;
using System.Text.Json.Serialization;
using API.DTOs;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket, List<PersonalAccount> personalAccount)
        {
            var basketDto = new BasketDto
            {
                Id = basket.Id,
                UserId = basket.UserId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ServiceId = item.ServiceId,
                    PersonalAccountId = item.PersonalAccountId,
                    Name = item.Service.Name,
                    PictureUrl = item.Service.PictureUrl,
                    PriceIndividual = item.Service.PriceIndividual,
                    PriceLegal = item.Service.PriceLegal,
                    PersonalAccount = item.PersonalAccount,
                    Price = personalAccount.FirstOrDefault(p => p.Id == item.PersonalAccountId)?.Price,
                    HasCounter = item.Service.HasCounter
                }).ToList()
            };
            
            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            string basketJson = JsonSerializer.Serialize(basketDto, options);

            BasketDto basketDeserialized = JsonSerializer.Deserialize<BasketDto>(basketJson, options);

            return basketDeserialized;
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> basket, string userId)
        {
            return basket.Include(i => i.Items)
            .ThenInclude(s => s.Service)
            .Where(u => u.UserId == userId);
        }
    }
}