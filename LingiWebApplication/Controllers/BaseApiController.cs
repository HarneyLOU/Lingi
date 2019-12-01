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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace LingiWebApplication.Controllers
{
        [Route("api/[controller]")]
        public class BaseApiController : Controller
        {
            public BaseApiController(
                ApplicationDbContext context,
                RoleManager<IdentityRole> roleManager,
                UserManager<ApplicationUser> userManager,
                IConfiguration configuration,
                IMapper mapper
                )
            {
                // Instantiate the required classes through DI
                DbContext = context;
                RoleManager = roleManager;
                UserManager = userManager;
                Configuration = configuration;
                Mapper = mapper;


            // Instantiate a single JsonSerializerOptions object
            // that can be reused multiple times.
            JsonSettings = new JsonSerializerOptions
            {
                WriteIndented = true,
                Encoder = JavaScriptEncoder.Create(UnicodeRanges.All)
            };

        }

            protected ApplicationDbContext DbContext { get; private set; }
            protected RoleManager<IdentityRole> RoleManager { get; private set; }
            protected UserManager<ApplicationUser> UserManager { get; private set; }
            protected IConfiguration Configuration { get; private set; }
            protected JsonSerializerOptions JsonSettings { get; private set; }
            protected IMapper Mapper { get; private set; }
        }
}