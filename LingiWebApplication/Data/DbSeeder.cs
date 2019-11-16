using LingiWebApplication.Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
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
            if (!dbContext.Users.Any())
            {
                CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();
            }
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
                LastModifiedDate = lastModifiedDate
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
                LastModifiedDate = lastModifiedDate
            };
            var user_Piotr = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Piotr",
                Email = "piotr@mail.kom",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
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
