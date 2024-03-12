namespace API.Models
{
    public class Basket
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        
        public void AddItem(Service service)
        {
            if (Items.All(item => item.ServiceId != service.Id))
            {
                Items.Add(new BasketItem { Service = service });
            }

            return;
        }

        public void RemoveItem(int serviceId)
        {
            var item = Items.FirstOrDefault(item => item.ServiceId == serviceId);

            if (item == null) return;

            Items.Remove(item);
        }
    }
}