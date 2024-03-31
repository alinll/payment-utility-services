using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class User : IdentityUser
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MidName { get; set; }
    }
}