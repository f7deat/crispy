using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface ICategoryService
    {
        Task<List<Category>> GetListAsync();
        Task<Category> AddAsync(Category category);
    }
}
