using ApplicationCore.Entities;
using ApplicationCore.Helpers;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public Task<int> CountAsync()
        {
            return _productRepository.CountAsync();
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var product = await _productRepository.FindAsync(id);
            return await _productRepository.RemoveAsync(product) > 0;
        }

        public async Task<dynamic> ExportAsync()
        {
            var products = await _productRepository.ListAllAsync();
            return await ExcelHelper.ExportProduct(products.ToList());
        }

        public Task<Product> FindAsync(Guid id) => _productRepository.FindAsync(id);

        public async Task<IEnumerable<Product>> GetByOrderTypeAsync(OrderType orderType)
        {
            if (orderType == OrderType.Export)
            {
                return await _productRepository.GetListInStockAsync();
            }
            return await _productRepository.ListAllAsync();
        }

        public Task<IEnumerable<Product>> ListAllAsync() => _productRepository.ListAllAsync();

        public async Task<dynamic> UpdateAsync(Product product)
        {
            string error = string.Empty;
            bool succeeded = false;
            try
            {
                if (product?.SalePrice > product?.UnitPrice)
                {
                    error = "Giá khuyến mại không được lớn hơn giá bán!";
                }
                else
                {
                    product.ModifiedDate = DateTime.Now;
                    succeeded = await _productRepository.UpdateAsync(product) > 0;
                }
            }
            catch (Exception ex)
            {
                error = ex.ToString();
            }
            return new { succeeded, error };
        }
    }
}
