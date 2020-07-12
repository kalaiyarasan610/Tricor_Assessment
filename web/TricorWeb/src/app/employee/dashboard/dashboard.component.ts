import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private employeeservice: EmployeeService) {
    console.log(this.employeeservice.employeeCache);
    if(this.employeeservice.employeeCache != undefined){
      this.employeeservice.employeeCache.employeeid = 0;
      this.employeeservice.employeeCache.firstname = "";
      this.employeeservice.employeeCache.lastname = "";
      this.employeeservice.employeeCache.gender = "";
      this.employeeservice.employeeCache.age = 0;
      this.employeeservice.employeeCache.joineddate = new Date();
    }
  }
  ngOnInit(): void {
  }

}
