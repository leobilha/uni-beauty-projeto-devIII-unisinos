namespace API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string CompleteAddress { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}
