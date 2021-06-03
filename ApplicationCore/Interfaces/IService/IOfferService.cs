using ApplicationCore.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;
using Identity;
using System;

namespace ApplicationCore.Interfaces.IService
{
    public interface IOfferService
    {
        Task<dynamic> AddAsync(Offer item);
        Task<IEnumerable<Offer>> GetListAsync();
        Task<dynamic> GetDetailsAsync(long id);
        Task<dynamic> AddDetailsAsync(OfferDetail item);
        Task<byte[]> ExportAsync(long id, ApplicationUser user);
        Task<object> DeleteAsync(long id);
        Task<dynamic> DeleteDetailsAsync(Guid id);
    }
}
