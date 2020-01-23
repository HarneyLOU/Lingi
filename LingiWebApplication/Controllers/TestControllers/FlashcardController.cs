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
        [Authorize]
        public IActionResult Get(int id)
        {
            List<Flashcard> tests = DbContext.Flashcards.Where(x => x.TestId == id).ToList();
            var viewFlashcards = Mapper.Map<List<FlashcardViewModel>>(tests);
            return new JsonResult(viewFlashcards, JsonSettings);
        }

        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody]List<FlashcardViewModel> model)
        {
            if (model == null) return new StatusCodeResult(500);

            List<Flashcard> newFlashcards = new List<Flashcard>();
           

            foreach (FlashcardViewModel flashcard in model)
            {
                newFlashcards.Add(new Flashcard()
                {
                    TestId = flashcard.TestId,
                    Word1 = flashcard.Word1,
                    Word2 = flashcard.Word2,
                    Example1 = flashcard.Example1,
                    Example2 = flashcard.Example2,
                });
            }

            DbContext.Flashcards.AddRange(newFlashcards);
            DbContext.SaveChanges();

            return new JsonResult(Mapper.Map<List<FlashcardViewModel>>(newFlashcards));
        }

        [HttpPost]
        public IActionResult Post([FromBody]List<FlashcardViewModel> model)
        {
            if (model == null) return new StatusCodeResult(500);

            List<Flashcard> newFlashcards = new List<Flashcard>();
            List<Flashcard> updatedFlashcards = new List<Flashcard>();

            foreach (FlashcardViewModel flashcard in model)
            {
                if(flashcard.Id == 0)
                {
                    newFlashcards.Add(new Flashcard()
                    {
                        TestId = flashcard.TestId,
                        Word1 = flashcard.Word1,
                        Word2 = flashcard.Word2,
                        Example1 = flashcard.Example1,
                        Example2 = flashcard.Example2,
                    });
                }
                else
                {
                    var ourFlashcard = DbContext.Flashcards.Where(x => x.Id == flashcard.Id).FirstOrDefault();
                    ourFlashcard.Word1 = flashcard.Word1;
                    ourFlashcard.Word2 = flashcard.Word2;
                    ourFlashcard.Example1 = flashcard.Example1;
                    ourFlashcard.Example2 = flashcard.Example2;
                    updatedFlashcards.Add(ourFlashcard);
                }
            }

            if (newFlashcards.Count() != 0)
            {
                updatedFlashcards.AddRange(newFlashcards);
                DbContext.Flashcards.AddRange(newFlashcards);
            }
            DbContext.SaveChanges();

            return new JsonResult(Mapper.Map<List<FlashcardViewModel>>(updatedFlashcards));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var flashcard = DbContext.Flashcards.Where(i => i.Id == id)
                .FirstOrDefault();

            if (flashcard == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Flashcard ID {0} has not been found", id)
                });
            }

            DbContext.Flashcards.Remove(flashcard);

            DbContext.SaveChanges();

            return new NoContentResult();
        }

    }
}