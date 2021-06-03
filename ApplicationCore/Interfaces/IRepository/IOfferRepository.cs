using ApplicationCore.Entities;
using ApplicationCore.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IOfferRepository : IAsyncRepository<Offer>
    {
        Task<dynamic> GetDetailsAsync(long id);
        Task<dynamic> AddDetailsAsync(OfferDetail item);
        Task<List<OfferExcel>> GetOfferExcel(long id);
        Task<object> DeleteAsync(long id);
        Task DeleteDetailsAsync(Guid id);
    }
}