using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public int BasketId { get; set; }
        public int PersonalAccountId { get; set; }
        public Service Service { get; set; }
        public Basket Basket { get; set; }
        public PersonalAccount PersonalAccount { get; set; }
    }
}