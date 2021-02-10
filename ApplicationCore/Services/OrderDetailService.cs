using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        public OrderDetailService(IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }
        public async Task<dynamic> AddAsync(Guid orderId, List<OrderDetailModel> orderDetailModels)
        {
            var data = new List<OrderDetail>();
            foreach (var item in orderDetailModels)
            {
                data.Add(new OrderDetail { ProductId = item.ProductId, OrderId = item.OrderId, Quantity = item.Quantity });
            }
            bool succeeded = await _orderDetailRepository.AddRangeAsync(data);
            return new { succeeded };
        }
    }
}
