using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        public OrderService(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
        }
        public async Task<Guid> AddAsync(Cart cart, string userId)
        {
            var data = new Order
            {
                CreatedBy = userId,
                CreatedDate = DateTime.Now,
                ModifiedBy = userId,
                ModifiedDate = DateTime.Now,
                Status = 0,
                OrderType = cart.OrderType,
                CustomerId = cart.CustomerId ?? Guid.NewGuid().ToString()
            };
            await _orderRepository.AddAsync(data);
            return data.Id;
        }

        public Task<IEnumerable<Order>> GetListAsync() => _orderRepository.ListAllAsync();

        public async Task<dynamic> RemoveAsync(Guid id)
        {
            var listOrderDetail = await _orderDetailRepository.GetInOrderAsync(id);
            foreach (var item in listOrderDetail)
            {
                await _orderDetailRepository.RemoveAsync(item);
            }
            var data = await _orderRepository.GetByIdAsync(id);
            var succeeded = await _orderRepository.RemoveAsync(data);
            return new { succeeded };
        }
    }
}
