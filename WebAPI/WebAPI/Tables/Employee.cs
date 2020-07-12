using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Tables
{
    [Table("employee")]
    public class Employee
    {
        [Key]
        public int employeeid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public int age { get; set; }
        public DateTime joineddate { get; set; }
    }
}