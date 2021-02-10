using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IOrderDetailRepository : IAsyncRepository<OrderDetail>
    {
        Task<bool> AddRangeAsync(List<OrderDetail> data);
    }
}
