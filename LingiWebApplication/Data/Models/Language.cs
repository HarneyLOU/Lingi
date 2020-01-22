using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data.Models
{
    public class Language
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public virtual List<Test> Tests { get; set; }

        public virtual List<ApplicationUser> Users { get; set; }

    }
}
