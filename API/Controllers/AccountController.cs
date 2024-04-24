using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Extensions;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ServiceContext _context;
        public AccountController(ServiceContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            var personalAccounts = await _context.PersonalAccounts
            .Include(a => a.Address)
            .Include(s => s.Service)
            .Where(u => u.Address.UserId == User.Identity.Name)
            .ToListAsync();

            if(!ModelState.IsValid || user == null)
            {
                return Unauthorized();
            }

            var userBasket = await RetrieveBasket(loginDto.Email);
            await Authenticate(user);

            return new UserDto
            {
                Email = user.Email,
                Basket = userBasket?.MapBasketToDto(personalAccounts),
                RoleId = user.RoleId
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            if (ModelState.IsValid)
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
                
                if (user == null)
                {
                    user = new User
                    {
                        UserName = registerDto.UserName,
                        Email = registerDto.Email,
                        LastName = registerDto.LastName,
                        FirstName = registerDto.FirstName,
                        MidName = registerDto.MidName,
                        Password = registerDto.Password,
                        RoleId = 2
                    };
                    
                    Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Buyer");
                    
                    if (userRole != null)
                    {
                        user.Role = userRole;
                    }
                }
                else
                {
                    return Unauthorized();
                }

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            else
            {
                ModelState.AddModelError("", "Неправильний логін і (або) пароль");
            }

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<User>> GetCurrentUser() 
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == User.Identity.Name);
            var userBasket = await RetrieveBasket(User.Identity.Name);
            var personalAccounts = await _context.PersonalAccounts
            .Include(a => a.Address)
            .Include(s => s.Service)
            .Where(u => u.Address.UserId == User.Identity.Name)
            .ToListAsync();

            return user;
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return StatusCode(201);
        }

        [HttpPost("{serviceId}")]
        public async Task<ActionResult<PersonalAccount>> GiveCounters(int serviceId, int previousCounter, int currentCounter)
        {
            if (previousCounter < 0 || currentCounter < 0)
            {
                return BadRequest(new ProblemDetails{ Title = "Показники лічильника не можуть бути від'ємними числами" });
            }
            else if (previousCounter > currentCounter)
            {
                return BadRequest(new ProblemDetails{ Title = "Поточний показник лічильника не може бути меншим за попередній" });
            }

            var service = await _context.Services.FindAsync(serviceId);

            if (service == null) return BadRequest(new ProblemDetails{ Title = "Сервіс не знайдено" });

            var personalAccount = await _context.PersonalAccounts
            .Include(a => a.Address)
            .Include(s => s.Service)
            .Where(u => u.Address.UserId == User.Identity.Name)
            .FirstOrDefaultAsync(s => s.ServiceId == serviceId);

            if (personalAccount == null) return BadRequest(new ProblemDetails{ Title = "У вас немає особового рахунку для даного сервісу" });

            if (previousCounter == personalAccount.PreviousCounterValue && currentCounter == personalAccount.CurrentCounterValue)
            {
                return BadRequest(new ProblemDetails{ Title = "Дані лічильники уже записані" });
            }

            if (service.HasCounter == true)
            {
                personalAccount.PreviousCounterValue = previousCounter;
                personalAccount.CurrentCounterValue = currentCounter;
                personalAccount.Difference = currentCounter - previousCounter;

                if (personalAccount.Address.Type == Models.Type.House)
                {
                    personalAccount.Price = personalAccount.Difference * service.PriceIndividual;
                }
                else
                {
                    personalAccount.Price = personalAccount.Difference * service.PriceLegal;
                }
            }
            else
            {
                return BadRequest(new ProblemDetails{ Title = "Даний сервіс не потребує показників лічильників" });
            }

            var result = await _context.SaveChangesAsync() > 0;

            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            string personalAccountJson = JsonSerializer.Serialize(personalAccount, options);

            PersonalAccount personalAccountDeserialized = JsonSerializer.Deserialize<PersonalAccount>(personalAccountJson, options);

            if (result) return personalAccountDeserialized;

            return BadRequest(new ProblemDetails{ Title = "Не вдалося зберегти показники лічильників" });
        }

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.Name)
            };

            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, 
            ClaimsIdentity.DefaultRoleClaimType);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        private async Task<Basket> RetrieveBasket(string userId)
        {
            return await _context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(s => s.Service)
                        .FirstOrDefaultAsync(x => x.UserId == userId);
        }
    }
}