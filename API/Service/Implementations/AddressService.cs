using API.Data.Abstractions;
using API.Models;
using API.Service.Abstractions;

namespace API.Service.Implementations
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;

        public AddressService(IAddressRepository addressRepository) => _addressRepository = addressRepository;

        public async Task<Address> AddAsync(Address address)
        {
            try
            {
                if (address is null) { throw new ArgumentException("Endereço não pode ser vazio."); }

                await _addressRepository.AddAsync(address);

                return await Task.FromResult(address);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
