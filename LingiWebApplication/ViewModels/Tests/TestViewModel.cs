using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.ViewModels.Tests
{
    public class TestViewModel
    {
        public int Id { get; set; }

        public int LanguageId { get; set; }

        public int CategoryId { get; set; }

        public int LevelId { get; set; }

        public DateTime LastModifiedDate;

        public DateTime CreatedDate;
    }
}
