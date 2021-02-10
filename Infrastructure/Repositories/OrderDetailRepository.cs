using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;
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
    }
}
