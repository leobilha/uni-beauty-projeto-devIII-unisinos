using API.Models;

namespace API.Service.Abstractions
{
    public interface IAddressService 
    {
        Task<Address> AddAsync(Address address);
    }
}
