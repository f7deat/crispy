using Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public AccountController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [Route("get-list-account")]
        public IActionResult GetListAccount()
        {
            return Ok(_userManager.Users.Where(x => x.LockoutEnd == null).ToList());
        }

        [Route("get/{id}")]
        public async Task<IActionResult> GetAccount([FromRoute]string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return Ok(user);
        }

        [Route("update")]
        public async Task<IActionResult> Update([FromBody] ApplicationUser user)
        {
            var data = await _userManager.FindByIdAsync(user.Id);
            data.Name = user.Name;
            data.PhoneNumber = user.PhoneNumber;
            var result = await _userManager.UpdateAsync(data);
            return Ok(new { result.Succeeded, result.Errors });
        }
        [Route("remove"), HttpPost]
        public async Task<IActionResult> Remove([FromBody] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.LockoutEnd = DateTime.Now.AddYears(100);

            var result = await _userManager.UpdateAsync(user);
            return Ok(new { result.Succeeded, result.Errors });
        }
    }
}
