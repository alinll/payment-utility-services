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
                    Price = new List<decimal>
                    {
                        2.64m
                    },
                    MeasureId = 1
                },
                new Service
                {
                    Name = "Опалення",
                    PictureUrl = "/images/services/heating.png",
                    Price = new List<decimal>
                    {
                        1314.08m
                    },
                    MeasureId = 3
                },
                new Service
                {
                    Name = "Водопостачання",
                    PictureUrl = "/images/services/water.png",
                    Price = new List<decimal>
                    {
                        5.02m,
                        12.95m
                    },
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Водовідведення",
                    PictureUrl = "/images/services/water.png",
                    Price = new List<decimal>
                    {
                        3.89m,
                        15.29m
                    },
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Газ",
                    PictureUrl = "/images/services/gas.png",
                    Price = new List<decimal>
                    {
                        7.96m
                    },
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Доставка газу",
                    PictureUrl = "/images/services/gas.png",
                    Price = new List<decimal>
                    {
                        1.68m
                    },
                    MeasureId = 2
                }
            );

            context.SaveChanges();
        }
    }
}