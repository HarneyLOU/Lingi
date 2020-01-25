using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.ViewModels.Tests
{
    public class QuizAnswerViewModel
    {
        public int Id { get; set; }

        public int QuizId { get; set; }

        public string Answer { get; set; }

        public bool Correct { get; set; }
    }
}
