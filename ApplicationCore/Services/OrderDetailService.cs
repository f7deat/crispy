using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IProductRepository _productRepository;

        public OrderDetailService(IOrderDetailRepository orderDetailRepository, IProductRepository productRepository)
        {
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
        }
        public async Task<dynamic> AddAsync(Guid orderId, Cart cart)
        {
            bool succeeded = false;
            string error = string.Empty;
            try
            {
                var data = new List<OrderDetail>();
                foreach (var item in cart.CartItems)
                {
                    var product = await _productRepository.GetByIdAsync(item.Id);
                    product.UnitStock = cart.OrderType == OrderType.Export ? product.UnitStock - item.Quantity : product.UnitStock + item.Quantity;
                    data.Add(new OrderDetail { ProductId = item.Id, OrderId = item.OrderId, Quantity = item.Quantity });
                }
                succeeded = await _orderDetailRepository.AddRangeAsync(data);
            }
            catch (Exception ex)
            {
                error = ex.ToString();
            }
            return new { succeeded, error };
        }
    }
}
