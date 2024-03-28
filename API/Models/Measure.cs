namespace API.Models
{
    public class Measure
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Service> Services { get; set; }
    }
}