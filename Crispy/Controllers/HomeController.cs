using Microsoft.AspNetCore.Mvc;

namespace Crispy.Controllers
{
    public class HomeController : Controller
    {
        [HttpPost]
        public IActionResult Login()
        {
            return Ok(true);
        }
    }
}
