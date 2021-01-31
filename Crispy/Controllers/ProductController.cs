using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly UserManager<ApplicationUser> _userManager;
        public ProductController(IProductService productService, UserManager<ApplicationUser> userManager)
        {
            _productService = productService;
            _userManager = userManager;
        }
        [Route("add"), HttpPost]
        public async Task<IActionResult> Add(Product product)
        {
            string userId = _userManager.GetUserId(User);
            product.CreatedBy = userId;
            product.Modifiedby = userId;
            await _productService.AddAsync(product);
            return CreatedAtAction(nameof(Add), product.Id);
        }
    }
}
