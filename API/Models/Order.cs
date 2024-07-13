using API.Models.Requests;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int CardNumber { get; set; }
        public string EmailUser { get; set; }
        public string TypeUser { get; set; }
        public int AddressId { get; set; }
    }
}
