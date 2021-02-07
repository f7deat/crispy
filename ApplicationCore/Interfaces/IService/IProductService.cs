using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IProductService
    {
        Task<Product> AddAsync(Product product);
        Task<IReadOnlyList<Product>> ListAllAsync();
        Task<Product> FindAsync(Guid id);
        Task<bool> DeleteAsync(Guid id);
        Task<dynamic> UpdateAsync(Product product);
        Task<dynamic> ExportAsync();
    }
}
