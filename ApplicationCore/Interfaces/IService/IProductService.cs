using ApplicationCore.Entities;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IService
{
    public interface IProductService
    {
        Task<Product> AddAsync(Product product);
    }
}
