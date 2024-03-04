namespace API.Models
{
    public class Debt
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<DebtItem> Items { get; set; } = new();
    }
}