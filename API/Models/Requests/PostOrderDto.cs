namespace API.Models.Requests
{
    public class PostOrderDto
    {
        public int Number { get; set; }
        public string EmailUser { get; set; }
        public int CardNumber { get; set; }
        public string TypeUser { get; set; }
        public PostAddressDto Address { get; set; }
    }
}
