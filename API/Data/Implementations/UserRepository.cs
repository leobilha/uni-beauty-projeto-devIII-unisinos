using API.Data.Abstractions;
using API.Data.Base;
using API.Data.Context;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Implementations
{
    public class UserRepository : AbstractRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }
    }
}