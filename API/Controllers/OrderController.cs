using API.Models.Requests;
using API.Models;
using API.Service.Abstractions;
using API.Service.Implementations;
using API.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService) => _orderService = orderService;

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] PostOrderDto postOrderDto)
        {
            if (ModelState.IsValid)
            {
                Order orderBase = await _orderService.GetAsync(new GetOrderDto { Number = postOrderDto.Number });

                if (orderBase is not null) { return Ok(new FaultModel { Status = "Erro", Message = $"Pedido {orderBase.Number} já existe!" }); }

                await _orderService.AddAsync(postOrderDto);

                return Ok(new FaultModel { Status = "Ok", Message = "Pedido realizado com sucesso!" });
            }

            return BadRequest(new FaultModel
            {
                Status = "Erro",
                Message = $"Modelo Inválido.\nEstado do modelo: {ModelState.ValidationState}"
            });
        }
    }
}
