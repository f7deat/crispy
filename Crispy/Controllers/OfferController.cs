using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crispy.Controllers
{
    [Route("api/[controller]")]
    public class OfferController : Controller
    {
        private readonly IOfferService _offerService;
        private readonly UserManager<ApplicationUser> _userManager;

        public OfferController(IOfferService offerService, UserManager<ApplicationUser> userManager)
        {
            _offerService = offerService;
            _userManager = userManager;
        }

        [Route("get-list")]
        public async Task<IActionResult> GetListAsync() => Ok(await _offerService.GetListAsync());

        [Route("add"), HttpPost]
        public async Task<IActionResult> AddAsync([FromBody] Offer offer)
        {
            var user = await _userManager.GetUserAsync(User);
            offer.CreatedBy = user.Id;
            offer.ModifiedBy = user.Id;
            return Ok(await _offerService.AddAsync(offer));
        }

        [Route("details/get/{id}")]
        public async Task<IActionResult> GetDetailsAsync(long id)
        {
            return Ok(await _offerService.GetDetailsAsync(id));
        }

        [Route("details/add"), HttpPost]
        public async Task<IActionResult> AddDetaisAsync([FromBody] OfferDetail item)
        {
            var user = await _userManager.GetUserAsync(User);
            item.CreatedBy = user.Id;
            item.ModifiedBy = user.Id;
            return CreatedAtAction(nameof(AddDetaisAsync), await _offerService.AddDetailsAsync(item));
        }

        [HttpPost("details/export/{id}")]
        public async Task<IActionResult> ExportAsync([FromRoute]long id)
        {
            var user = await _userManager.GetUserAsync(User);
            return File(await _offerService.ExportAsync(id, user), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteAsync([FromRoute]long id)
        {
            return Ok(await _offerService.DeleteAsync(id));
        }

        [HttpPost("details/delete/{id}")]
        public async Task<IActionResult> DeleteDetailsAsync([FromRoute] Guid id)
        {
            return Ok(await _offerService.DeleteDetailsAsync(id));
        }
    }
}