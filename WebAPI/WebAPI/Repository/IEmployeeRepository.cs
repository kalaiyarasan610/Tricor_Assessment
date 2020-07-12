using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public interface IEmployeeRepository
    {
        List<Employee> GetEmployeeDetails();
        string Add_UpdateEmployee(Employee employee);
        string DeleteEmployee(int id);
    }
}
