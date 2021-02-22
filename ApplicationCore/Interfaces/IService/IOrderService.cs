using ApplicationCore.Entities;
using ApplicationCore.Models;
using System;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IOrderService
    {
        Task<Guid> AddAsync(Cart cart, string userId);
        Task<dynamic> GetListAsync();
        Task<dynamic> RemoveAsync(Guid id);
        Task<int> CountAsync(OrderType orderType);
    }
}
