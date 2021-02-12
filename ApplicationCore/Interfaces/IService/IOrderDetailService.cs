using ApplicationCore.Models;
using System;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IOrderDetailService
    {
        Task<dynamic> AddAsync(Guid orderId, Cart cart);
    }
}
