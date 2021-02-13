using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    public class DashboardController : Controller
    {
        private readonly IProductService _productService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IOrderService _orderService;

        public DashboardController(IProductService productService, UserManager<ApplicationUser> userManager, IOrderService orderService)
        {
            _productService = productService;
            _userManager = userManager;
            _orderService = orderService;
        }

        [Route("get-order-chart")]
        public IActionResult GetOrderChart()
        {
            var data = new List<dynamic>();
            for (int i = 1; i < 13; i++)
            {
                data.Add(new { month = "Tháng " + i, point = new Random().Next(10, 100) });
            }
            return Ok(data);
        }

        [Route("get-total-product")]
        public async Task<IActionResult> GetTotalProduct() => Ok(await _productService.CountAsync());

        [Route("get-total-employee")]
        public IActionResult GetTotalEmployee() => Ok(_userManager.Users.Count());

        [Route("get-total-order")]
        public async Task<IActionResult> GetTotalOrder(OrderType orderType) => Ok(await _orderService.CountAsync(orderType));
    }
}
