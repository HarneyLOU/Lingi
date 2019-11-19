using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.Data.Models.Tests
{
    public class Flashcard
    {
        public int Id { get; set; }

        public int TestId { get; set; }

        public string Word1 { get; set; }

        public string Word2 { get; set; }

        public string Example1 { get; set; }

        public string Example2 { get; set; }
    }
}
