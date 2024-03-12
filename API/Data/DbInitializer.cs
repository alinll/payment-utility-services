using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ServiceContext context)
        {
            if (context.Services.Any()) return;

            context.Services.AddRange(
                new Service 
                {
                    Name = "Електроенергія",
                    PictureUrl = "/images/services/electricity.png",
                    Price = 2.64m
                },
                new Service
                {
                    Name = "Вода",
                    PictureUrl = "/images/services/water.png",
                    Price = 12.948m
                },
                new Service
                {
                    Name = "Газ",
                    PictureUrl = "/images/services/gas.png",
                    Price = 7.98m
                },
                new Service
                {
                    Name = "Доставка газу",
                    PictureUrl = "/images/services/gas.png",
                    Price = 1.68m
                },
                new Service
                {
                    Name = "Опалення",
                    PictureUrl = "/images/services/heating.png",
                    Price = 1684.32m
                }
            );

            context.SaveChanges();
        }
    }
}