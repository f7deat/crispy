using ApplicationCore.Entities;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IOrderRepository : IAsyncRepository<Order>
    {
        Task<int> CountAsync(OrderType orderType);
        Task<dynamic> GetListAsync();
    }
}
