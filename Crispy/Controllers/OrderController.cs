using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Http;
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
        public OrderController(IProductService productService)
        {
            _productService = productService;
        }

        [Route("get-list-product")]
        public async Task<IActionResult> GetListProduct(OrderType orderType)
        {
            return Ok(await _productService.GetByOrderTypeAsync(orderType));
        }
    }
}
