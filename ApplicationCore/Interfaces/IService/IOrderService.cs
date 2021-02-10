using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IOrderService
    {
        Task<Guid> AddAsync(OrderModel order, string userId);
    }
}
