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
            category.Status = CategoryStatus.ACTIVE;
            return _categoryRepository.AddAsync(category);
        }

        public async Task<dynamic> DeleteAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            return new {succeeded = await _categoryRepository.RemoveAsync(category)};
        }

        public async Task<List<Category>> GetListAsync()
        {
            var result = await _categoryRepository.ListAllAsync();
            return result.ToList();
        }
    }
}
