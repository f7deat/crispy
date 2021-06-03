using System.Threading.Tasks;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using ApplicationCore.Models;

namespace Infrastructure.Repositories
{
    public class OfferRepository : EfRepository<Offer>, IOfferRepository
    {
        public OfferRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<dynamic> AddDetailsAsync(OfferDetail item)
        {
            item.CreatedDate = DateTime.Now;
            item.ModifiedDate = DateTime.Now;
            await _context.OfferDetails.AddAsync(item);
            return new { succeeded = await _context.SaveChangesAsync() > 0, data = item };
        }

        public async Task<object> DeleteAsync(long id)
        {
            var details = await _context.OfferDetails.Where(x => x.OfferId == id).ToListAsync();
            _context.OfferDetails.RemoveRange(details);
            var offer = await _context.Offers.FindAsync(id);
            if (offer != null)
            {
                _context.Offers.Remove(offer);
            }
            return new {
                succeeded = await _context.SaveChangesAsync()
            };
        }

        public async Task DeleteDetailsAsync(Guid id)
        {
            var offerDetails = await _context.OfferDetails.FindAsync(id);
            _context.OfferDetails.Remove(offerDetails);
            await _context.SaveChangesAsync();
        }

        public async Task<dynamic> GetDetailsAsync(long id)
        {
            var query = from a in _context.OfferDetails
                        join b in _context.Products on a.ProductId equals b.Id
                        where a.OfferId == id
                        select new
                        {
                            items = a,
                            products = b
                        };
            return await query.ToListAsync();
        }

        public async Task<List<OfferExcel>> GetOfferExcel(long id)
        {
            var query = from a in _context.Offers
                        join b in _context.OfferDetails on a.Id equals b.OfferId
                        join c in _context.Products on b.ProductId equals c.Id
                        join d in _context.Brands on c.BrandId equals d.Id
                        where a.Id == id
                        select new OfferExcel
                        {
                            CustomerName = "",
                            ProductName = c.Name,
                            Quantity = b.Quantity,
                            UnitInStock = c.UnitStock,
                            Note = b.Note,
                            DeliveryDate = b.DeliveryDate,
                            CreatedDate = b.CreatedDate,
                            UnitPrice = c.UnitPrice,
                            BrandName = d.Name
                        };
            return await query.ToListAsync();
        }
    }
}