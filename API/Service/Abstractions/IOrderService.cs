using API.Models.Requests;
using API.Models;

namespace API.Service.Abstractions
{
    public interface IOrderService
    {
        Task<Order> GetAsync(GetOrderDto userDto);

        Task<Order> AddAsync(PostOrderDto order);
    }
}
