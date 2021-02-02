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
    }
}
