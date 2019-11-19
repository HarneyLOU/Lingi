using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using LingiWebApplication.Data;
using LingiWebApplication.Data.Models;
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
            IConfiguration configuration
            )
            : base(context, roleManager, userManager, configuration) { }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var examples = new List<FlashcardViewModel>()
            {
                new FlashcardViewModel() 
                {
                    Id = 1,
                    Word1 = "Cześć",
                    Word2 = "Hello",
                    Example1 = "No cześć",
                    Example2 = "Eluwina mordo",
                },
                new FlashcardViewModel() 
                {
                    Id = 2,
                    Word1 = "Samochód",
                    Word2 = "Car",
                    Example1 = "Ten samochód jest bardzo szybki",
                    Example2 = "This bike is very slow",
                },
                new FlashcardViewModel() 
                {
                    Id = 3,
                    Word1 = "Kot",
                    Word2 = "Cat",
                    Example1 = "Ten kot ma ładne futro",
                    Example2 = "This cat has a nice fur",
                 },
            };

            var options = new JsonSerializerOptions
            {
                WriteIndented = true,
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.All)
            };
            return new JsonResult(examples, options);
        }
    }
}