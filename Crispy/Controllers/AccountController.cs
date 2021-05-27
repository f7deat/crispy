using ApplicationCore.Constants;
using Crispy.Models.Accounts;
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
        public async Task<IActionResult> GetListAccount()
        {
            return Ok(await _userManager.GetUsersInRoleAsync(CRole.EMPLOYEE));
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
            data.DateOfBirth = user.DateOfBirth;
            data.HireDate = user.HireDate;
            data.ManagerId = user.ManagerId;
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

        [Route("add/{role}"), HttpPost]
        public async Task<IActionResult> Add([FromBody] ApplicationUser user, [FromRoute]string role)
        {
            user.HireDate = DateTime.Now;
            user.IsEnabled = true;
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, role);
            }
            return CreatedAtAction(nameof(Add), new { result.Succeeded, result.Errors });
        }

        [Route("get-manager/{userId}")]
        public async Task<IActionResult> GetManagerAsync([FromRoute] string userId)
        {
            var user = await _userManager.GetUserAsync(User);
            return Ok(await _userManager.FindByIdAsync(user.ManagerId));
        }

        [Route("get-list-customer")]
        public async Task<IActionResult> GetListCustomer() => Ok(await _userManager.GetUsersInRoleAsync(CRole.CUSTOMER));

        [Route("get-users-in-role/{roleName}")]
        public async Task<IActionResult> GetUsersInRoleAsync([FromRoute] string roleName)
        {
            var users = await _userManager.GetUsersInRoleAsync(roleName);
            if (User.IsInRole(CRole.EMPLOYEE))
            {
                var user = await _userManager.GetUserAsync(User);
                return Ok(users.Where(x => x.ManagerId == user.Id));
            }
            return Ok(users);
        }

        [Route("add-to-roles"), HttpPost]
        public async Task<IActionResult> AddToRoles([FromBody] AddToRole addToRole)
        {
            var user = await _userManager.FindByIdAsync(addToRole.Id);
            var roles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, roles);
            var result = await _userManager.AddToRolesAsync(user, addToRole.Roles);
            return Ok(new { result.Succeeded, result.Errors });
        }

        [Route("get-top-customers-spending")]
        public async Task<IActionResult> GetTopCustomersSpending()
        {
            var customers = await _userManager.GetUsersInRoleAsync(CRole.CUSTOMER);
            return Ok(customers.OrderByDescending(x => x.Salary).Take(6));
        }

        [Route("get-roles")]
        public async Task<IActionResult> GetRolesAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            return Ok(await _userManager.GetRolesAsync(user));
        }
    }
}
