using ApplicationCore.Entities;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IOrderService
    {
        Task<Guid> AddAsync(Cart cart, string userId);
        Task<IEnumerable<Order>> GetListAsync();
        Task<dynamic> RemoveAsync(Guid id);
    }
}
