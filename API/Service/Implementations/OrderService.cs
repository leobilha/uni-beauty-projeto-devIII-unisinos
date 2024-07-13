using API.Data.Abstractions;
using API.Models;
using API.Models.Requests;
using API.Service.Abstractions;

namespace API.Service.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IAddressRepository _addressRepository;

        public OrderService(IOrderRepository orderRepository, IAddressRepository addressRepository)
        {
            _orderRepository = orderRepository;
            _addressRepository = addressRepository;
        }  

        public async Task<Order> GetAsync(GetOrderDto orderDto) => await _orderRepository.GetAsync(o => o.Number == orderDto.Number);

        public async Task<Order> AddAsync(PostOrderDto postOrderDto)
        {
            try
            {
                if (postOrderDto is null) { throw new ArgumentException("Pedido não pode ser vazio."); }

                var newAddress = await _addressRepository.AddAsync(new Address
                {
                    City = postOrderDto.Address.City,
                    CompleteAddress = postOrderDto.Address.CompleteAddress,
                    Country = postOrderDto.Address.Country,
                    Email = postOrderDto.Address.Email,
                    Phone = postOrderDto.Address.Phone,
                    State = postOrderDto.Address.State,
                    ZipCode = postOrderDto.Address.ZipCode
                }) ?? throw new ArgumentException("Ocorreu algum erro ao registrar o endereço.");

                var newOrder =  await _orderRepository.AddAsync(new Order
                {
                    AddressId = newAddress.Id,
                    CardNumber =  postOrderDto.CardNumber,
                    EmailUser = postOrderDto.EmailUser,
                    Number = postOrderDto.Number,
                    TypeUser = postOrderDto.TypeUser
                }) ?? throw new ArgumentException("Ocorreu algum erro ao registrar o pedido.");

                return await Task.FromResult(newOrder);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
