using Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    public class RoleController : Controller
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        public RoleController(RoleManager<ApplicationRole> roleManager)
        {
            _roleManager = roleManager;
        }
        
        [Route("get-list")]
        public IActionResult GetList() => Ok(_roleManager.Roles.ToList());

        [Route("add/{name}"), HttpPost]
        public async Task<IActionResult> Add([FromRoute]string name)
        {
            var role = new ApplicationRole
            {
                Name = name
            };
            var result = await _roleManager.CreateAsync(role);
            return Ok(new { result.Succeeded, result.Errors });
        }

        [Route("delete/{id}"), HttpPost]
        public async Task<IActionResult> Delete([FromRoute]string id)
        {
            var role = await _roleManager.FindByIdAsync(id);
            var result = await _roleManager.DeleteAsync(role);
            return Ok(new { result.Succeeded, result.Errors });
        }

        public async Task<IActionResult> AsignTo()
        {
            var result = await _roleManager.
        }
    }
}
