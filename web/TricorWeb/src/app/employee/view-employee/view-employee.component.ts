import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee, EmployeeModule } from 'src/app/modules/employee/employee.module';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  viewemployee : Employee;
  selectedEmpFlag : boolean = false;
  constructor(private employeeservice: EmployeeService, private datePipe: DatePipe, private router: Router) { 
    this.viewemployee = this.employeeservice.employeeCache;
    console.log(this.viewemployee)
    if(this.viewemployee != undefined){
      this.selectedEmpFlag = true;
    }
    else{
      this.selectedEmpFlag = false;
    }
    //this.viewemployee.joineddate = this.datePipe.transform(this.employeeservice.employeeCache.joineddate, 'dd/MM/yyyy');
  }

  ngOnInit(): void {
  }
}
