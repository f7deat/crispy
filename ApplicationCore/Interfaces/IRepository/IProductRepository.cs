using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IProductRepository : IAsyncRepository<Product>
    {
        Task<Product> FindAsync(Guid id);
        Task<IEnumerable<Product>> GetListInStockAsync();
    }
}
