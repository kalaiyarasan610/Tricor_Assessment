using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Tables;

namespace WebAPI
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
           : base(options)
        {
            //Database.SetInitializer<ApplicationDBContext>(null);
        }
        public DbSet<Employee> emplyeeTable { get; set; }
    }
}
