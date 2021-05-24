using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public Task<Category> AddAsync(Category category)
        {
            category.CreatedDate = DateTime.Now;
            category.ModifiedDate = DateTime.Now;
            category.ModifiedBy = "tandc";
            category.CreatedBy = "tandc";
            category.Status = 1;
            return _categoryRepository.AddAsync(category);
        }

        public async Task<List<Category>> GetListAsync()
        {
            var result = await _categoryRepository.ListAllAsync();
            return result.ToList();
        }
    }
}
