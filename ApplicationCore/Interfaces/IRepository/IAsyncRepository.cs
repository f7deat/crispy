﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IAsyncRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> ListAllAsync();
        Task<T> AddAsync(T entity);
        Task<int> UpdateAsync(T entity);
        Task<int> RemoveAsync(T entity);
    }
}
