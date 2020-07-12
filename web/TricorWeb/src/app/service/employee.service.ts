import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeModule } from '../modules/employee/employee.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeCache: Employee;
  constructor(private http: HttpClient) { 

  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://localhost:44317/api/employee')
  }
  
  postEmployees (_employeee: EmployeeModule): Observable<{}> {
    return this.http.post('https://localhost:44317/api/employee', _employeee);
  }
  deleteEmployees (id: string): Observable<{}> {
    return this.http.delete('https://localhost:44317/api/employee?id=' + id);
  }
}
