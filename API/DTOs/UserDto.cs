using API.Models;

namespace API.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public BasketDto Basket { get; set; }
        public int RoleId { get; set; }
    }
}