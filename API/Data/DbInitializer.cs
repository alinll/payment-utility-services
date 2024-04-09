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
                        Name = "Individual"
                    },
                    new Role
                    {
                        Id = 2,
                        Name = "Legal"
                    },
                    new Role
                    {
                        Id = 3,
                        Name = "Admin"
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
                        RoleId = 1
                    },
                    new User
                    {
                        UserName = "VitalikCompany",
                        Email = "VitalikCompany@gmail.com",
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
                        RoleId = 3
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
}