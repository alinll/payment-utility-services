namespace API.Models
{
    public class PersonalAccount
    {
        public int Id { get; set; }
        public int? PreviousCounterValue { get; set; }
        public int? CurrentCounterValue { get; set; }
        public int? Difference { get; set; }
        public decimal? Price { get; set; }
        public int AddressId { get; set; }
        public int ServiceId { get; set; }
        public Address Address { get; set; }
        public Service Service { get; set; }
    }
}