using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class EmployeeController : ControllerBase
    {

        public readonly IEmployeeRepository _employeeRepos;

        public EmployeeController(IEmployeeRepository employeeRepos)
        {
            _employeeRepos = employeeRepos;
        }
        public IEnumerable<Employee> Get()
        {

            List<Employee> _employee = _employeeRepos.GetEmployeeDetails();
            return _employee;
        }
        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            try
            {
                return Ok(_employeeRepos.Add_UpdateEmployee(employee));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpDelete]
        public IActionResult delete(int id)
        {
            try
            {
                return Ok(_employeeRepos.DeleteEmployee(id));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
