using API.DTOs;
using API.Models;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
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
                    PriceIndividual = item.Service.PriceIndividual,
                    PriceLegal = item.Service.PriceLegal,
                    HasCounter = item.Service.HasCounter
                }).ToList()
            };
        }
    }
}