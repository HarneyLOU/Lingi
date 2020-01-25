using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data.Models.Tests
{
    public class Quiz
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public int TestId { get; set; }

        [Required]
        public string Question { get; set; }

    }
}
