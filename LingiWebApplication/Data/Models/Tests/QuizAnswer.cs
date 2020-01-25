using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

    }
}
