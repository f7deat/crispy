using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;
        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public async Task<dynamic> AddAsync(Brand brand)
        {
            brand.CreatedDate = DateTime.Now;
            brand.ModifiedDate = DateTime.Now;
            return new {succeeded = true, data = await _brandRepository.AddAsync(brand)};
        }

        public async Task<dynamic> UpdateAsync(Brand brand)
        {
            brand.ModifiedDate = DateTime.Now;
            await _brandRepository.UpdateAsync(brand);
            return new {succeeded = true, data = brand};
        }

        public Task<IEnumerable<Brand>> GetListAsync()
        {
            return _brandRepository.ListAllAsync();
        }
    }
}
