using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
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
        [Route("list-all")]
        public async Task<IActionResult> ListAll()
        {
            return Ok(await _productService.ListAllAsync());
        }

        [Route("find/{id}")]
        public async Task<IActionResult> Find([FromRoute] Guid id)
        {
            return Ok(await _productService.FindAsync(id));
        }

        [HttpPost, Route("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id) => Ok(await _productService.DeleteAsync(id));

        [Route("update"), HttpPost]
        public async Task<IActionResult> Update([FromBody] Product product)
        {
            string userId = _userManager.GetUserId(User);
            product.Modifiedby = userId;
            product.CreatedBy ??= userId;
            return Ok(await _productService.UpdateAsync(product));
        }

        [Route("export"), HttpPost]
        public async Task<IActionResult> Export()
        {
            return File(await _productService.ExportAsync(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }
    }
}
