using System;
using System.ComponentModel.DataAnnotations;

namespace LingiWebApplication.Data.Models
{
    public class ApplicationUser
    {
        public ApplicationUser()
        {

        }

        [Key]
        [Required]
        public string Id { get; set; }

        //public virtual List<Tests> Tests { get; set; }

        [Required]
        [MaxLength(128)]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        public string DisplayName { get; set; }

        public string Notes { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime LastModifiedDate { get; set; }
    }
}
