using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    public class BrandController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService, UserManager<ApplicationUser> userManager)
        {
            _brandService = brandService;
            _userManager = userManager;
        }

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync()
        {
            return Ok(await _brandService.GetListAsync());
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAsync([FromBody] Brand brand)
        {
            var user = await _userManager.GetUserAsync(User);
            brand.CreatedBy = user.Id;
            brand.ModifiedBy = user.Id;
            return CreatedAtAction(nameof(AddAsync), await _brandService.AddAsync(brand));
        }
    }
}
