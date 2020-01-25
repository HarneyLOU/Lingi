using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using AutoMapper;
using LingiWebApplication.Data;
using LingiWebApplication.Data.Models;
using LingiWebApplication.Data.Models.Tests;
using LingiWebApplication.ViewModels.Tests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace LingiWebApplication.Controllers.TestControllers
{
    public class QuizController : BaseApiController
    {
        public QuizController(
            ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration,
            IMapper mapper
            )
            : base(context, roleManager, userManager, configuration, mapper) { }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            List<Quiz> quizzes = DbContext.Quizzes
                .Include(x => x.Answers)
                .Where(x => x.TestId == id).ToList();
            //var viewQuizzes = Mapper.Map<List<QuizViewModel>>(quizzes);
            return new JsonResult(quizzes, JsonSettings);
        }

       
    }
}