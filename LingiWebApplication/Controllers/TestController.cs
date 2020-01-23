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
        public IActionResult Get(int id)
        {
            Test test = DbContext.Tests
                .Include(x => x.Type)
                .Include(x => x.Level)
                .Include(x => x.Language)
                .Include(x => x.User)
                .Where(x => x.Id == id).FirstOrDefault();
            var viewTest = Mapper.Map<TestViewModel>(test);
            return new JsonResult(viewTest, JsonSettings);
        }

        [HttpGet("user/{user}")]
        public IActionResult GetUser(string user)
        {
            var userId = DbContext.Users.Where(x => x.UserName == user).FirstOrDefault().Id;
            var tests = DbContext.Tests
                .Include(x => x.Type)
                .Include(x => x.Level)
                .Include(x => x.Language)
                .Include(x => x.User)
                .Where(x => x.UserId == userId).ToList();
            var viewTests = Mapper.Map<List<TestViewModel>>(tests);
            return new JsonResult(viewTests, JsonSettings);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Test> tests = DbContext.Tests
                .Include(x => x.Type)
                .Include(x => x.Level)
                .Include(x => x.Language)
                .AsNoTracking()
                .ToList();

            var viewTests = Mapper.Map<List<TestViewModel>>(tests);

            return new JsonResult(viewTests, JsonSettings);
        }

        [HttpPut]
        [Authorize]
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

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody]TestViewModel model)
        {
            if (model == null) return new StatusCodeResult(500);

            var test = DbContext.Tests.Where(x => x.Id == model.Id).FirstOrDefault();

            if (test == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Test ID {0} has not been found", model.Id)
                });
            }

                test.Tags = model.Tags;
                test.Description = model.Description;
                test.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                test.Language = DbContext.Languages.Where(x => x.Name == model.Language).FirstOrDefault();
                test.Type = DbContext.Types.Where(x => x.Name == model.Type).FirstOrDefault();
                test.Level = DbContext.Levels.Where(x => x.Name == model.Level).FirstOrDefault();
                test.LastModifiedDate = DateTime.Now;

            DbContext.SaveChanges();

            return new JsonResult(Mapper.Map<TestViewModel>(test));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var test = DbContext.Tests.Where(i => i.Id == id)
                .FirstOrDefault();

            if (test == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Test ID {0} has not been found", id)
                });
            }

            DbContext.Tests.Remove(test);

            DbContext.SaveChanges();

            return new NoContentResult();
        }
    }
}