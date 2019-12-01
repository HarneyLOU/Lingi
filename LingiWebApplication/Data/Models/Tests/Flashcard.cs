using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data.Models.Tests
{
    public class Flashcard
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public int TestId { get; set; }

        [Required]
        public string Word1 { get; set; }

        [Required]
        public string Word2 { get; set; }

        public string Example1 { get; set; }

        public string Example2 { get; set; }
    }
}
