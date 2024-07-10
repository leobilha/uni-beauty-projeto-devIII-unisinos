using API.Models.Requests;
using API.Models;

namespace API.Service.Abstractions
{
    public interface IUserService
    {
        Task<User> GetAsync(GetUserDto userDto);

        Task AddAsync(User user);
    }
}
