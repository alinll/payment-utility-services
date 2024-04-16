using API.Models;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ServiceContext context)
        {
            if (!context.Services.Any())
            {
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
                        Id = 1,
                        Name = "Електроенергія",
                        PictureUrl = "/images/services/electricity.png",
                        PriceIndividual = 3.96m,
                        PriceLegal = 2.64m,
                        HasCounter = true,
                        MeasureId = 1
                    },
                    new Service
                    {
                        Id = 2,
                        Name = "Опалення",
                        PictureUrl = "/images/services/heating.png",
                        PriceIndividual = 1314.08m,
                        PriceLegal = 1014.08m,
                        HasCounter = false,
                        MeasureId = 3
                    },
                    new Service
                    {
                        Id = 3,
                        Name = "Водопостачання",
                        PictureUrl = "/images/services/water.png",
                        PriceIndividual = 12.95m,
                        PriceLegal = 5.02m,
                        HasCounter = true,
                        MeasureId = 2
                    },
                    new Service
                    {
                        Id = 4,
                        Name = "Водовідведення",
                        PictureUrl = "/images/services/water.png",
                        PriceIndividual = 15.29m,
                        PriceLegal = 3.89m,
                        HasCounter = true,
                        MeasureId = 2
                    },
                    new Service
                    {
                        Id = 5,
                        Name = "Газ",
                        PictureUrl = "/images/services/gas.png",
                        PriceIndividual = 7.98m,
                        PriceLegal = 7.96m,
                        HasCounter = true,
                        MeasureId = 2
                    },
                    new Service
                    {
                        Id = 6,
                        Name = "Доставка газу",
                        PictureUrl = "/images/services/gas.png",
                        PriceIndividual = 2.112m,
                        PriceLegal = 1.68m,
                        HasCounter = false,
                        MeasureId = 2
                    }
                );

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
                        Id = 1,
                        UserName = "Andrii",
                        LastName = "Яшан",
                        FirstName = "Андрій",
                        MidName = "Олегович",
                        Email = "Andrii@gmail.com",
                        Password = "Pa$$w0rd",
                        RoleId = 1
                    },
                    new User
                    {
                        Id = 2,
                        UserName = "Roman",
                        LastName = "Іваненко",
                        FirstName = "Роман",
                        MidName = "Романович",
                        Email = "Roman@gmail.com",
                        Password = "Pa$$w0rd",
                        RoleId = 2
                    }
                );

                context.Addresses.AddRange(
                    new Address
                    {
                        Id = 1,
                        Region = "Івано-Франківська",
                        City = "Івано-Франківськ",
                        Street = "Шевченка",
                        HouseNumber = 1,
                        PartHouse = 1,
                        ApartmentNumber = 1,
                        Type = Models.Type.House,
                        UserId = "Andrii@gmail.com"
                    },
                    new Address
                    {
                        Id = 2,
                        Region = "Івано-Франківська",
                        City = "Івано-Франківськ",
                        Street = "Чорновола",
                        HouseNumber = 2,
                        PartHouse = 2,
                        ApartmentNumber = 2,
                        Type = Models.Type.Enterprise,
                        UserId = "Roman@gmail.com"
                    }
                );

                context.PersonalAccounts.AddRange(
                    new PersonalAccount
                    {
                        Id = 1,
                        AddressId = 1,
                        ServiceId = 1
                    },
                    new PersonalAccount
                    {
                        Id = 2,
                        AddressId = 1,
                        ServiceId = 2
                    },
                    new PersonalAccount
                    {
                        Id = 3,
                        AddressId = 2,
                        ServiceId = 1
                    },
                    new PersonalAccount
                    {
                        Id = 4,
                        AddressId = 2,
                        ServiceId = 2
                    },
                    new PersonalAccount
                    {
                        Id = 5,
                        AddressId = 1,
                        ServiceId = 3
                    }
                );

            context.SaveChanges();
            }
        }
    }
}