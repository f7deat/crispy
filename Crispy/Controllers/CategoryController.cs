using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
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
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _categoryService.GetListAsync());

        public async Task<IActionResult> AddAsync(Category category) => CreatedAtAction(nameof(AddAsync), await _categoryService.AddAsync(category));
    }
}
