using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LingiWebApplication.ViewModels
{
    public class TestViewModel
    {
        public int Id { get; set; }

        public string Tags { get; set; }

        public string Description { get; set; }

        public string Language { get; set; }

        public string Type { get; set; }

        public string Level { get; set; }

        public double Rate { get; set; }

        public string User { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
