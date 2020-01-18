using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LingiWebApplication.Data;
using LingiWebApplication.Data.Models;
using LingiWebApplication.Data.Models.Tests;
using LingiWebApplication.ViewModels;
using LingiWebApplication.ViewModels.Tests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LingiWebApplication.Controllers
{
    public class TestController : BaseApiController
    {
        public TestController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IMapper mapper
            )
            : base(context, roleManager, userManager, configuration, mapper) { }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Test test = DbContext.Tests.Where(x => x.Id == id).FirstOrDefault();
            var viewTest = Mapper.Map<TestViewModel>(test);
            return new JsonResult(viewTest, JsonSettings);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Test> tests = DbContext.Tests
                .Include(x => x.Type)
                .Include(x => x.Level)
                .AsNoTracking()
                .ToList();

            var viewTests = Mapper.Map<List<TestViewModel>>(tests);

            return new JsonResult(viewTests, JsonSettings);
        }


    }
}