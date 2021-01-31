using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    /// <summary>
    /// "There's some repetition here - couldn't we have some the sync methods call the async?"
    /// https://blogs.msdn.microsoft.com/pfxteam/2012/04/13/should-i-expose-synchronous-wrappers-for-asynchronous-methods/
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class EfRepository<T> : IAsyncRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _ontext;

        public EfRepository(ApplicationDbContext context)
        {
            _ontext = context;
        }

        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _ontext.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _ontext.Set<T>().ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            _ontext.Set<T>().Add(entity);
            await _ontext.SaveChangesAsync();

            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _ontext.Entry(entity).State = EntityState.Modified;
            await _ontext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            _ontext.Set<T>().Remove(entity);
            await _ontext.SaveChangesAsync();
        }
    }
}
