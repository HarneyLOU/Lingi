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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace LingiWebApplication.Controllers.TestControllers
{
    public class FlashcardController : BaseApiController
    {
        public FlashcardController(
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
            List<Flashcard> tests = DbContext.Flashcards.Where(x => x.TestId == id).ToList();
            var viewFlashcards = Mapper.Map<List<FlashcardViewModel>>(tests);
            return new JsonResult(viewFlashcards, JsonSettings);
        }
    }
}