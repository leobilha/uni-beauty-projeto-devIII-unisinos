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

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] GetUserDto userRequest)
        {
            if (ModelState.IsValid)
            {
                User userBase = await _userService.GetAsync(userRequest);

                if (userBase is null) { return NotFound(new FaultModel { Status = "Erro", Message = "Usu�rio n�o existe!" }); }

                if (!await Util.VerifyPassword(userRequest.Password, userBase.Password))
                    return BadRequest(new FaultModel { Status = "Erro", Message = "Senha incorreta!" });

                return Ok(new FaultModel { Status = "Ok", Message = "Usu�rio logado com sucesso!" });
            }

            return BadRequest(new FaultModel
            {
                Status = "Erro",
                Message = $"Modelo Inv�lido.\nEstado do modelo: {ModelState.ValidationState}"
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] PostUserDto user)
        {
            if (ModelState.IsValid)
            {
                User userBase = await _userService.GetAsync(new GetUserDto { Email = user.Email });

                if (userBase is not null) { return NotFound(new FaultModel { Status = "Erro", Message = "Usu�rio j� existe!" }); }

                string hashSenha = await Util.HashPassword(user.Password);

                await _userService.AddAsync(new User
                {
                    Name = user.Name,
                    Email = user.Email,
                    Password = hashSenha,
                    Document = user.Document,
                    Type = user.Type,
                });

                return Ok(new FaultModel { Status = "Ok", Message = "Usu�rio registrado com sucesso!" });
            }

            return BadRequest(new FaultModel
            {
                Status = "Erro",
                Message = $"Modelo Inv�lido.\nEstado do modelo: {ModelState.ValidationState}"
            });
        }
    }
}
