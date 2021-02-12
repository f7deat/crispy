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
    public class OrderDetailRepository : EfRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<bool> AddRangeAsync(List<OrderDetail> data)
        {
            await _context.AddRangeAsync(data);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<OrderDetail>> GetInOrderAsync(Guid id)
        {
            return await _context.OrderDetails.Where(x => x.OrderId == id).ToListAsync();
        }
    }
}
