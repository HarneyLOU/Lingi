using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.ViewModels.Tests
{
    public class QuizViewModel
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public string Question { get; set; }
        public virtual List<QuizAnswerViewModel> Answers { get; set; }
    }
}
