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
                    PictureUrl = "/images/services/electricity.png"
                },
                new Service
                {
                    Name = "Вода",
                    PictureUrl = "/images/services/water.png"
                },
                new Service
                {
                    Name = "Газ",
                    PictureUrl = "/images/services/gas.png"
                },
                new Service
                {
                    Name = "Доставка газу",
                    PictureUrl = "/images/services/gas.png"
                },
                new Service
                {
                    Name = "Опалення",
                    PictureUrl = "/images/services/heating.png"
                }
            );

            context.SaveChanges();
        }
    }
}