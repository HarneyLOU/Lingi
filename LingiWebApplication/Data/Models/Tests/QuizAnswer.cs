using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data.Models.Tests
{
    public class QuizAnswer
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public int QuizId { get; set; }

        [Required]
        public string Answer { get; set; }

        public bool Correct { get; set; }

        [ForeignKey("QuizId")]
        public virtual Quiz Quiz { get; set;}

    }
}
