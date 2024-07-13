using API.Data.Abstractions;
using API.Data.Base;
using API.Data.Context;
using API.Models;

namespace API.Data.Implementations
{
    public class AddressRepository : AbstractRepository<Address>, IAddressRepository
    {
        public AddressRepository(AppDbContext context) : base(context)
        {
        }
    }
}
