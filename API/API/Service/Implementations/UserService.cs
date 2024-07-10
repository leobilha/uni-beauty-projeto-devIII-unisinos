using API.Data.Abstractions;
using API.Models;
using API.Models.Requests;
using API.Service.Abstractions;

namespace API.Service.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetAsync(GetUserDto userDto) => await _userRepository.GetAsync(u => u.Email == userDto.Email);

        public async Task AddAsync(User user)
        {
            try
            {
                if (user is null) { throw new ArgumentException("Usuário não pode ser vazio."); }

                await _userRepository.AddAsync(user);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
