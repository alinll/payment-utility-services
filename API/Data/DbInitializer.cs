using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ServiceContext context)
        {
            if (context.Services.Any()) return;

            context.Measures.AddRange(
                new Measure 
                {
                    Id = 1,
                    Name = "кВт-година"
                },
                new Measure 
                {
                    Id = 2,
                    Name = "м³"
                },
                new Measure 
                {
                    Id = 3,
                    Name = "Гкал"
                }
            );

            context.Services.AddRange(
                new Service 
                {
                    Name = "Електроенергія",
                    PictureUrl = "/images/services/electricity.png",
                    Price = 2.64m,
                    MeasureId = 1
                },
                new Service
                {
                    Name = "Вода",
                    PictureUrl = "/images/services/water.png",
                    Price = 12.948m,
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Газ",
                    PictureUrl = "/images/services/gas.png",
                    Price = 7.98m,
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Доставка газу",
                    PictureUrl = "/images/services/gas.png",
                    Price = 1.68m,
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Опалення",
                    PictureUrl = "/images/services/heating.png",
                    Price = 1684.32m,
                    MeasureId = 3
                }
            );

            context.SaveChanges();
        }
    }
}