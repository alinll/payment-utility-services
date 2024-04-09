namespace API.DTOs
{
    public class RegisterDto : LoginDto
    {
        public string UserName { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MidName { get; set; }
    }
}