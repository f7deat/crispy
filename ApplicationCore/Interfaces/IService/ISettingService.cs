using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationCore.Entities;

namespace ApplicationCore.Interfaces.IService
{
    public interface ISettingService
    {
        Task<IEnumerable<Setting>> GetListAsync();
    }
}
