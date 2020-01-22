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

            var a = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            
            
            
            return new JsonResult(DbContext.Users.Where(x => x.Id == a), JsonSettings);
        }
    }
}
