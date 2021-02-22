using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<dynamic> GetListAsync()
        {
            var query = from a in _context.Orders
                        join b in _context.Users on a.CustomerId equals b.Id
                        orderby a.ModifiedDate descending
                        select new
                        {
                            a.Id,
                            a.CreatedDate,
                            a.ModifiedDate,
                            a.OrderType,
                            a.Status,
                            CustomerName = b.Name
                        };
            return await query.ToListAsync();
        }
    }
}
