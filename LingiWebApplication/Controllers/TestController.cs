using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using LingiWebApplication.Data;
using LingiWebApplication.Data.Models;
using LingiWebApplication.Data.Models.Tests;
using LingiWebApplication.ViewModels;
using LingiWebApplication.ViewModels.Tests;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "RegisteredUser")]
        public IActionResult Get(int id)
        {
            Test test = DbContext.Tests.Where(x => x.Id == id).FirstOrDefault();
            var viewTest = Mapper.Map<TestViewModel>(test);
            return new JsonResult(viewTest, JsonSettings);
        }

        [HttpGet]
        [Authorize]
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

        [HttpPut]
        public IActionResult Put([FromBody]TestViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            Test newTest = new Test()
            {
                Tags = model.Tags,
                Description = model.Description,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
                Language = DbContext.Languages.Where(x => x.Name == model.Language).FirstOrDefault(),
                Type = DbContext.Types.Where(x => x.Name == model.Type).FirstOrDefault(),
                Level = DbContext.Levels.Where(x => x.Name == model.Level).FirstOrDefault(),
                Rate = 0,
                LastModifiedDate = DateTime.Now,
                CreatedDate = DateTime.Now,
            };
            

            DbContext.Tests.Add(newTest);
            DbContext.SaveChanges();

            return new JsonResult(Mapper.Map<TestViewModel>(newTest));
        }
    }
}