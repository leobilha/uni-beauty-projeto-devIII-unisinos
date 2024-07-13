using API.Data.Abstractions;
using API.Data.Base;
using API.Data.Context;
using API.Models;

namespace API.Data.Implementations
{
    public class OrderRepository : AbstractRepository<Order>, IOrderRepository
    {
        public OrderRepository(AppDbContext context) : base(context)
        {
        }
    }
}
