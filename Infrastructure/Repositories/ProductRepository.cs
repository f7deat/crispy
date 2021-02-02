using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using System;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ProductRepository : EfRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<Product> FindAsync(Guid id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}
