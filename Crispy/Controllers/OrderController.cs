using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using ApplicationCore.Models;
using Crispy.Models;
using Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IProductService _productService;
        private readonly IOrderService _orderService;
        private readonly IOrderDetailService _orderDetailService;
        private readonly UserManager<ApplicationUser> _userManager;
        public OrderController(IProductService productService, IOrderService orderService, IOrderDetailService orderDetailService, UserManager<ApplicationUser> userManager)
        {
            _productService = productService;
            _orderService = orderService;
            _orderDetailService = orderDetailService;
            _userManager = userManager;
        }

        [Route("get-list-product")]
        public async Task<IActionResult> GetListProduct(OrderType orderType)
        {
            return Ok(await _productService.GetByOrderTypeAsync(orderType));
        }

        [Route("add")]
        public async Task<IActionResult> Add(OrderModel order)
        {
            string userId = _userManager.GetUserId(User);
            var orderId = await _orderService.AddAsync(order, userId);
            var response = await _orderDetailService.AddAsync(orderId, order.OrderDetailModels);
            return CreatedAtAction(nameof(Add), response);
        }
    }
}
