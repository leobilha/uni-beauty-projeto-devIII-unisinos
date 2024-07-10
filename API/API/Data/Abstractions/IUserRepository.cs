using API.Data.Repository;
using API.Models;

namespace API.Data.Abstractions
{
    public partial interface IUserRepository : IGenericRepository<User>
    {
    }
}
