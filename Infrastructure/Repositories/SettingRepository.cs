using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repositories
{
    public class SettingRepository : EfRepository<Setting>, ISettingRepository
    {
        public SettingRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
