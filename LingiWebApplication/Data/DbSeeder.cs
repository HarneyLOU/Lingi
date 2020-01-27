using LingiWebApplication.Data.Models;
using LingiWebApplication.Data.Models.Tests;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data
{
    public class DbSeeder
    {
        public static void Seed(ApplicationDbContext dbContext,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            if (!dbContext.Types.Any())
            {
                SeedCategories(dbContext);
            }
            if (!dbContext.Languages.Any())
            {
                SeedLanguages(dbContext);
            }
            if (!dbContext.Levels.Any())
            {
                SeedLevels(dbContext);
            }
            if (!dbContext.Users.Any())
            {
                CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();
            }
            if (!dbContext.Tests.Any())
            {
                SeedExampleTests(dbContext);
            }
            if (!dbContext.Flashcards.Any())
            {
                SeedExampleFlashcards(dbContext);
            }
            if (!dbContext.Quizzes.Any())
            {
                SeedExampleQuizzes(dbContext);
            }
        }

        private static void SeedCategories(ApplicationDbContext dbContext)
        {
            dbContext.Types.AddRange(new List<Models.Type>()
            { 
                new Models.Type()
                {
                    Id = 1,
                    Name = "Flashcards",
                    Description = "Learn new words"
                },
                new Models.Type()
                {
                    Id = 2,
                    Name = "Quiz",
                    Description = "Choose the correct answer"
                },
                new Models.Type()
                {
                    Id = 3,
                    Name = "Fill the gap",
                    Description = "Check your knowledge"
                },
                new Models.Type()
                {
                    Id = 4,
                    Name = "Reading",
                    Description = "Read and answer the questions"
                }
            });
            dbContext.SaveChanges();
        }

        private static void SeedLanguages(ApplicationDbContext dbContext)
        {
            dbContext.Languages.AddRange(new List<Language>()
            {
                new Language()
                {
                    Id = 1,
                    Name = "Polish-English",
                    Description = "Polish-English",
                },
                new Language()
                {
                    Id = 2,
                    Name = "Polish-Russian",
                    Description = "Polish-Russian",
                },
                new Language()
                {
                    Id = 3,
                    Name = "Polish-Spanish",
                    Description = "Polish-Spanish",
                },

            });
            dbContext.SaveChanges();
        }

        private static void SeedLevels(ApplicationDbContext dbContext)
        {
            dbContext.Levels.AddRange(new List<Level>()
            {
                new Level()
                {
                    Id = 1,
                    Name = "Beginner",
                    Description = "Beginner",
                },
                new Level()
                {
                    Id = 2,
                    Name = "Elementary",
                    Description = "Elementary ",
                },
                new Level()
                {
                    Id = 3,
                    Name = "Low intermediate",
                    Description = "Low intermediate",
                },
                new Level()
                {
                    Id = 4,
                    Name = "High intermediate",
                    Description = "High intermediate",
                },
                new Level()
                {
                    Id = 5,
                    Name = "Advanced",
                    Description = "Advanced",
                },
            });
            dbContext.SaveChanges();
        }
        private static void SeedExampleTests(ApplicationDbContext dbContext)
        {  
            string[] tags = new string[12]{ "Animals", "Home", "Work", "University", "IT", "WAT", "Travelling", "Different", "Countries", "Feelings", "Expressions", "Useful" };
            
            Test test = new Test()
            {
                Description = "Useful verbs for beginners",
                User = dbContext.Users.FirstOrDefault(),
                Language = dbContext.Languages.Where(x => x.Id == 1).FirstOrDefault(),
                LastModifiedDate = DateTime.Now,
                CreatedDate = DateTime.Now.AddDays(-8),
            };
            Random r = new Random();
            for (int i = 1; i <= 100; i++)
            {
                Test tempTest = test;
                int j = 0;
                string testTags = "";
                do
                {
                    testTags += tags[r.Next(12)] + " ";
                    j++;
                }
                while (r.Next(2) != 0 && j < 3);
                test.Tags = testTags.Remove(testTags.Length - 1);
                test.Id = i;
                int l = r.Next(5) + 1;
                test.Level = dbContext.Levels.Where(x => x.Id == l).FirstOrDefault();
                int t = r.Next(3) + 1;
                switch(i)
                {
                    case 1:
                        test.Type = dbContext.Types.Where(x => x.Id == 1).FirstOrDefault();
                        break;
                    case 2:
                        test.Type = dbContext.Types.Where(x => x.Id == 1).FirstOrDefault();
                        break;
                    case 3:
                        test.Type = dbContext.Types.Where(x => x.Id == 2).FirstOrDefault();
                        break;
                    case 4:
                        test.Type = dbContext.Types.Where(x => x.Id == 2).FirstOrDefault();
                        break;
                    default:
                        test.Type = dbContext.Types.Where(x => x.Id == t).FirstOrDefault();
                        break;
                }
                test.Rate = Math.Round(r.NextDouble() * 4, 1) + 1;
                dbContext.Tests.Add(test);
                dbContext.SaveChanges();
            }
            dbContext.SaveChanges();
        }

        private static void SeedExampleFlashcards(ApplicationDbContext dbContext)
        {
            dbContext.Flashcards.AddRange(new List<Flashcard>()
            {
                new Flashcard()
                {
                    Id = 1,
                    TestId = 1,
                    Word1 = "Cześć",
                    Word2 = "Hello",
                    Example1 = "Cześć kolego",
                    Example2 = "Hello mate",
                },
                new Flashcard()
                {
                    Id = 2,
                    TestId = 1,
                    Word1 = "Do widzenia",
                    Word2 = "Goodbye",
                    Example1 = "",
                    Example2 = "",
                },
                new Flashcard()
                {
                    Id = 3,
                    TestId = 1,
                    Word1 = "Kot",
                    Word2 = "Cat",
                    Example1 = "Mam kota",
                    Example2 = "I have a cat",
                },
                new Flashcard()
                {
                    Id = 4,
                    TestId = 2,
                    Word1 = "Dom",
                    Word2 = "House",
                    Example1 = "To bardzo duży dom",
                    Example2 = "This is a very big house",
                }
            });
            dbContext.SaveChanges();
        }

        private static void SeedExampleQuizzes(ApplicationDbContext dbContext)
        {
            dbContext.Quizzes.AddRange(new List<Quiz>()
            {
                new Quiz()
                {
                    Id = 1,
                    TestId = 3,
                    Question = "Ask out",
                },
                new Quiz()
                {
                    Id = 2,
                    TestId = 3,
                    Question = "Hang out"

                },
                new Quiz()
                {
                    Id = 3,
                    TestId = 3,
                    Question = "Bank on"

                },
            });
            dbContext.QuizAnswers.AddRange(new List<QuizAnswer>()
            {
                new QuizAnswer()
                {
                    QuizId = 1,
                    Answer = "Zaprosić kogoś",
                    Correct = true
                },
                new QuizAnswer()
                {
                    QuizId = 1,
                    Answer = "Zapytać o coś",
                    Correct = false

                },
                new QuizAnswer()
                {
                    QuizId = 1,
                    Answer = "Oświadczyć się",
                    Correct = false

                },
                new QuizAnswer()
                {
                    QuizId = 1,
                    Answer = "Wyręczyć kogoś",
                    Correct = false

                },
                new QuizAnswer()
                {
                    QuizId = 2,
                    Answer = "Spacerować",
                    Correct = true

                },
                 new QuizAnswer()
                {
                    QuizId = 2,
                    Answer = "Wisieć",
                    Correct = false

                },
                 new QuizAnswer()
                {
                    QuizId = 3,
                    Answer = "Przeliczać",
                    Correct = false

                },
                new QuizAnswer()
                {
                    QuizId = 3,
                    Answer = "Liczyć na kogoś",
                    Correct = true

                },
            });
            dbContext.SaveChanges();
        }

        private static async Task CreateUsers(ApplicationDbContext dbContext,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager)
        {
            DateTime createdDate = new DateTime(2019, 11, 13, 17, 10, 00);
            DateTime lastModifiedDate = DateTime.Now;

            string role_Administrator = "Administrator";
            string role_RegisteredUser = "RegisteredUser";

            if(!await roleManager.RoleExistsAsync(role_Administrator))
            {
                await roleManager.CreateAsync(new IdentityRole(role_Administrator));
            }

            if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
            {
                await roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
            }

            var user_Admin = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                Language = dbContext.Languages.FirstOrDefault()
            };



            if(await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                await userManager.CreateAsync(user_Admin, "Pass4Admin");
                await userManager.AddToRoleAsync(user_Admin, role_RegisteredUser);
                await userManager.AddToRoleAsync(user_Admin, role_Administrator);
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }

#if DEBUG
            var user_Raszer = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Raszer",
                Email = "raszer@atom.pl",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                Language = dbContext.Languages.FirstOrDefault()
            };
            var user_Piotr = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Piotr",
                Email = "piotr@mail.kom",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate,
                Language = dbContext.Languages.FirstOrDefault()
            };

            if (await userManager.FindByNameAsync(user_Raszer.UserName) == null)
            {
                await userManager.CreateAsync(user_Raszer, "Pass4Raszer");
                await userManager.AddToRoleAsync(user_Raszer, role_RegisteredUser);
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }

            if (await userManager.FindByNameAsync(user_Piotr.UserName) == null)
            {
                await userManager.CreateAsync(user_Piotr, "Pass4Piotr");
                await userManager.AddToRoleAsync(user_Piotr, role_RegisteredUser);
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }
#endif
            await dbContext.SaveChangesAsync();
        }
    }
}
