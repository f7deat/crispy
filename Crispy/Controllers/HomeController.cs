using Crispy.Models;
using Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    public class HomeController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public HomeController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var result = await _signInManager.PasswordSignInAsync(login.Username, login.Password, login.Remember, false);
            return Ok(new { result.Succeeded, result.IsNotAllowed, result.IsLockedOut, result.RequiresTwoFactor });
        }

        public IActionResult IsAuthenticated() => Ok(User.Identity.IsAuthenticated);

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterModel register)
        {
            var user = new ApplicationUser { 
                UserName = register.Username,
                Email = register.Username,
                IsEnabled = true
            };
            //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var result = await _userManager.CreateAsync(user, register.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
            }
            return Ok(new { result.Succeeded, result.Errors });
        }
    }
}
