using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LingiWebApplication.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {

        }

        public virtual List<Test> Tests { get; set; }

        public string DisplayName { get; set; }

        public string Notes { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }

        [ForeignKey("LanguageId")]
        public Language Language { get; set; }
    }
}
