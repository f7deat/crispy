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
    public class CategoryController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService, UserManager<ApplicationUser> userManager)
        {
            _categoryService = categoryService;
            _userManager = userManager;
        }
        
        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _categoryService.GetListAsync());

        [Route("add"), HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] Category category)
        {
            var user = await _userManager.GetUserAsync(User);
            category.CreatedBy = user.Id;
            category.ModifiedBy = user.Id;
            return CreatedAtAction(nameof(AddAsync), await _categoryService.AddAsync(category));
        }

        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute] int id) => Ok(await _categoryService.DeleteAsync(id));
    }
}
