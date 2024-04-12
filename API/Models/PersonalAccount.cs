namespace API.Models
{
    public class PersonalAccount
    {
        public int Id { get; set; }
        public int PreviousCounterValue { get; set; }
        public int CurrentCounterValue { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<Service> Services { get; set; }
    }
}