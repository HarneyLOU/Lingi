using AutoMapper;
using Microsoft.Extensions.Configuration;
using LingiWebApplication.Data;
using LingiWebApplication.Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using LingiWebApplication.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace LingiWebApplication.Controllers
{
    public class UserController : BaseApiController
    {
        public UserController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IMapper mapper
            )
            : base(context, roleManager, userManager, configuration, mapper) { }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var currentUser = DbContext.Users.Include(x => x.Language).Where(x => x.Id == id).FirstOrDefault();

            UserViewModel user = new UserViewModel
            {
                UserName = currentUser.UserName,
                Email = currentUser.Email,
                Language = currentUser.Language.Name,
            };
   
            return new JsonResult(user, JsonSettings);
        }
    }
}
