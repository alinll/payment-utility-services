namespace API.Models
{
    public enum Type { House, Enterprise }
    public class Address
    {
        public int Id { get; set; }
        public string Region { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public int PartHouse { get; set; }
        public int ApartmentNumber { get; set; }
        public Type Type { get; set; }
        
        public string UserId { get; set; }
        public User User { get; set; }
        public ICollection<PersonalAccount> PersonalAccounts { get; set; }
    }
}