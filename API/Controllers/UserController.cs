using API.Models;
using API.Models.Requests;
using API.Service.Abstractions;
using API.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) => _userService = userService;

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] GetUserDto userRequest)
        {
            if (ModelState.IsValid)
            {
                User userBase = await _userService.GetAsync(userRequest);

                if (userBase is null) { return Ok(new FaultModel { Status = "Erro", Message = "Usuário não existe!" }); }

                if (!await Util.VerifyPassword(userRequest.Password, userBase.Password))
                    return Ok(new FaultModel { Status = "Erro", Message = "Senha incorreta!" });

                return Ok(userBase.Type);
            }

            return BadRequest(new FaultModel
            {
                Status = "Erro",
                Message = $"Modelo Inválido.\nEstado do modelo: {ModelState.ValidationState}"
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] PostUserDto user)
        {
            if (ModelState.IsValid)
            {
                User userBase = await _userService.GetAsync(new GetUserDto { Email = user.Email, Type = user.Type });

                if (userBase is not null) { return Ok(new FaultModel { Status = "Erro", Message = "Usuário já existe!" }); }

                string hashSenha = await Util.HashPassword(user.Password);

                await _userService.AddAsync(new User
                {
                    Name = user.Name,
                    Email = user.Email,
                    Password = hashSenha,
                    Document = await Util.RemoveSpecialCharacters(user.Document),
                    Type = user.Type,
                });

                return Ok(new FaultModel { Status = "Ok", Message = "Cadastro realizado com sucesso!" });
            }

            return BadRequest(new FaultModel
            {
                Status = "Erro",
                Message = $"Modelo Inválido.\nEstado do modelo: {ModelState.ValidationState}"
            });
        }
    }
}
