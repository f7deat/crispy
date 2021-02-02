using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public Task<Product> AddAsync(Product product)
        {
            product.CreatedDate = DateTime.Now;
            product.ModifiedDate = DateTime.Now;
            return _productRepository.AddAsync(product);
        }

        public Task<Product> FindAsync(Guid id) => _productRepository.FindAsync(id);

        public Task<IReadOnlyList<Product>> ListAllAsync() => _productRepository.ListAllAsync();
    }
}
