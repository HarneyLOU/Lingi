using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LingiWebApplication.Data;
using LingiWebApplication.Data.Models;
using LingiWebApplication.Data.Models.Tests;
using LingiWebApplication.ViewModels;
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
            Test test = DbContext.Tests.Include(x => x.Type).Where(x => x.Id == id).FirstOrDefault();
            int categoryId = test.Type.Id;

            switch (categoryId)
            {
                case 1:
                    List<Flashcard> tests = DbContext.Flashcards.Where(x => x.TestId == test.Id).ToList();
                    return new JsonResult(tests, JsonSettings);
                default:
                    return new NotFoundResult();
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Test> tests = DbContext.Tests
                .Include(x => x.Type)
                .Include(x => x.Level)
                .ToList();

            var viewTests = Mapper.Map<List<TestViewModel>>(tests);

            return new JsonResult(viewTests, JsonSettings);
        }


    }
}