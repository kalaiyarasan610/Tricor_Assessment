using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class EmployeeRepository: IEmployeeRepository
    {
        public readonly ApplicationDBContext _context;

        public EmployeeRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public List<Employee> GetEmployeeDetails()
        {
            List<Employee> _employee = (from emp in _context.emplyeeTable
                                        select new Employee
                                        {
                                            employeeid = emp.employeeid,
                                            firstname = emp.firstname,
                                            lastname = emp.lastname,
                                            gender = emp.gender.ToUpper() == "M" ? "Male" : "Female",
                                            age = emp.age,
                                            joineddate = emp.joineddate
                                        }).ToList();
            return _employee;
        }
        public string Add_UpdateEmployee(Employee employee)
        {
            try
            {
                string result = "";

                if (employee.employeeid == 0)
                {
                    Tables.Employee _employee = new Tables.Employee();

                    _employee.employeeid = employee.employeeid;
                    _employee.firstname = employee.firstname;
                    _employee.lastname = employee.lastname;
                    _employee.gender = employee.gender;
                    _employee.age = employee.age;
                    _employee.joineddate = employee.joineddate;


                    _context.Add(_employee);
                    int a = _context.SaveChanges();
                    result = "{\"status \" : \"Inserted \"}";
                }
                else
                {
                    var updateEmployee = (from emp in _context.emplyeeTable where emp.employeeid == employee.employeeid select emp).First();

                    updateEmployee.firstname = employee.firstname;
                    updateEmployee.lastname = employee.lastname;
                    updateEmployee.age = employee.age;
                    updateEmployee.gender = employee.gender;
                    updateEmployee.joineddate = employee.joineddate;

                    _context.SaveChanges();
                    result = "{\"status \" : \"Updated \"}";
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string DeleteEmployee(int id)
        {
            try
            {
                var removeEmployee = _context.emplyeeTable.SingleOrDefault(x => x.employeeid == id);

                if (removeEmployee != null)
                {
                    _context.emplyeeTable.Remove(removeEmployee);
                    _context.SaveChanges();
                }
                return "{\"status \" : \"Deleted \"}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
