using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ServiceContext context)
        {
            if (!context.Users.Any())
            {
                context.Roles.AddRange(
                    new Role
                    {
                        Id = 1,
                        Name = "Admin"
                    },
                    new Role
                    {
                        Id = 2,
                        Name = "Buyer"
                    }
                );

                context.Users.AddRange(
                    new User
                    {
                        UserName = "Roman",
                        LastName = "Іваненко",
                        FirstName = "Роман",
                        MidName = "Романович",
                        Email = "Roman@gmail.com",
                        Password = "Pa$$w0rd",
                        RoleId = 2
                    },
                    new User
                    {
                        UserName = "Andrii",
                        LastName = "Яшан",
                        FirstName = "Андрій",
                        MidName = "Олегович",
                        Email = "Andrii@gmail.com",
                        Password = "Pa$$w0rd",
                        RoleId = 1
                    }
                );

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
                    PriceIndividual = 3.96m,
                    PriceLegal = 2.64m,
                    HasCounter = true,
                    MeasureId = 1
                },
                new Service
                {
                    Name = "Опалення",
                    PictureUrl = "/images/services/heating.png",
                    PriceIndividual = 1314.08m,
                    PriceLegal = 1014.08m,
                    HasCounter = false,
                    MeasureId = 3
                },
                new Service
                {
                    Name = "Водопостачання",
                    PictureUrl = "/images/services/water.png",
                    PriceIndividual = 12.95m,
                    PriceLegal = 5.02m,
                    HasCounter = true,
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Водовідведення",
                    PictureUrl = "/images/services/water.png",
                    PriceIndividual = 15.29m,
                    PriceLegal = 3.89m,
                    HasCounter = true,
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Газ",
                    PictureUrl = "/images/services/gas.png",
                    PriceIndividual = 7.98m,
                    PriceLegal = 7.96m,
                    HasCounter = true,
                    MeasureId = 2
                },
                new Service
                {
                    Name = "Доставка газу",
                    PictureUrl = "/images/services/gas.png",
                    PriceIndividual = 2.112m,
                    PriceLegal = 1.68m,
                    HasCounter = false,
                    MeasureId = 2
                }
            );

            context.SaveChanges();
            }
        }
    }
}