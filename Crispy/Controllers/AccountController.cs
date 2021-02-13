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
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("get-list-account")]
        public IActionResult GetListAccount()
        {
            return Ok(_userManager.Users.Where(x => x.LockoutEnd == null).ToList());
        }

        [Route("get/{id}")]
        public async Task<IActionResult> GetAccount([FromRoute] string id)
        {
            var user = "0".Equals(id) ? await _userManager.GetUserAsync(User) : await _userManager.FindByIdAsync(id);
            return Ok(user);
        }

        [Route("update"), HttpPost]
        public async Task<IActionResult> Update([FromBody] ApplicationUser user)
        {
            var data = await _userManager.FindByIdAsync(user.Id);
            data.Name = user.Name;
            data.PhoneNumber = user.PhoneNumber;
            var result = await _userManager.UpdateAsync(data);
            return Ok(new { result.Succeeded, result.Errors });
        }

        [Route("update-advance"), HttpPost]
        public async Task<IActionResult> UpdateAdvance([FromBody] ApplicationUser user)
        {
            var data = await _userManager.FindByIdAsync(user.Id);
            data.Salary = user.Salary;
            var result = await _userManager.UpdateAsync(data);
            return Ok(new { result.Succeeded, result.Errors });
        }
        [Route("delete/{id}"), HttpPost]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var result = await _userManager.DeleteAsync(user);
            return Ok(new { result.Succeeded, result.Errors });
        }

        [Route("add"), HttpPost]
        public async Task<IActionResult> Add([FromBody] ApplicationUser user)
        {
            user.HireDate = DateTime.Now;
            user.IsEnabled = true;
            user.Avatar = string.IsNullOrEmpty(user.Avatar) ? "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" : user.Avatar;
            var result = await _userManager.CreateAsync(user);
            return CreatedAtAction(nameof(Add), new { result.Succeeded, result.Errors });
        }
    }
}
