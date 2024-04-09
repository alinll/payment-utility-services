using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ActionResult<User>> Login(LoginDto loginDto) 
        {
            var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if(!ModelState.IsValid || user == null)
            {
                return Unauthorized();
            }

            var userBasket = RetrieveBasket(loginDto.Email);
            await Authenticate(user);

            JsonSerializerOptions options = new()
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            string userJson = JsonSerializer.Serialize(user, options);

            User userDeserialized = JsonSerializer.Deserialize<User>(userJson, options);

            return userDeserialized;
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
                        RoleId = 1
                    };
                    
                    Role userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Individual");
                    
                    if (userRole != null)
                    {
                        user.Role = userRole;
                    }
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

            return user;
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