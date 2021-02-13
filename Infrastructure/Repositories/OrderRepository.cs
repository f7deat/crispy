using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class OrderRepository : EfRepository<Order>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<int> CountAsync(OrderType orderType)
        {
            try
            {
                return await _context.Orders.CountAsync(x => x.OrderType == orderType);
            }
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
