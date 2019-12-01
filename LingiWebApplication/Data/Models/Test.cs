using LingiWebApplication.Data.Models.Tests;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data.Models
{
    public class Test
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public string Description { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        [ForeignKey("LanguageId")]
        public virtual Language Language { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        [ForeignKey("LevelId")]
        public virtual Level Level { get; set; }


        public double Rate { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
