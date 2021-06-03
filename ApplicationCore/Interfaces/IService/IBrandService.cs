using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationCore.Entities;

namespace ApplicationCore.Interfaces.IService
{
    public interface IBrandService
    {
        Task<IEnumerable<Brand>> GetListAsync();
        Task<dynamic> AddAsync(Brand brand);
        Task<dynamic> UpdateAsync(Brand brand);
    }
}
