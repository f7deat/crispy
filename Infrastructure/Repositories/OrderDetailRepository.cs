using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repositories
{
    public class OrderDetailRepository : EfRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
