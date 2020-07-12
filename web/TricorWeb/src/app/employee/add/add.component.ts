import { Component, OnInit, Input } from '@angular/core';
import { EmployeeModule } from '../../modules/employee/employee.module';
import { EmployeeService } from '../../service/employee.service';
import { Subject } from "rxjs";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  model = new EmployeeModule(0,'','','',0, '');
  @Input() resetFormSubject: Subject<boolean> = new Subject<boolean>();
  pageTitle: string = "Add";
  constructor(private employeeservice: EmployeeService, private datePipe: DatePipe, private router: Router) {
    if(this.employeeservice.employeeCache != undefined){
      if(this.employeeservice.employeeCache.employeeid != 0){
        this.pageTitle = "Update";
        this.model.employeeid = this.employeeservice.employeeCache.employeeid;
        this.model.firstname = this.employeeservice.employeeCache.firstname;
        this.model.lastname = this.employeeservice.employeeCache.lastname;
        this.model.gender = this.employeeservice.employeeCache.gender == 'Male' ? 'M' : 'F';
        this.model.age = this.employeeservice.employeeCache.age;
        this.model.joineddate = this.datePipe.transform(this.employeeservice.employeeCache.joineddate, 'yyyy-MM-dd');
      }
    }
   }

  ngOnInit(): void {
    
    this.resetFormSubject.subscribe(response => {
      if(response){
        if(this.employeeservice.employeeCache != undefined){
          if(this.employeeservice.employeeCache.employeeid != 0){
            this.pageTitle = "Update";
            this.model.employeeid = this.employeeservice.employeeCache.employeeid;
            this.model.firstname = this.employeeservice.employeeCache.firstname;
            this.model.lastname = this.employeeservice.employeeCache.lastname;
            this.model.gender = this.employeeservice.employeeCache.gender == 'Male' ? 'M' : 'F';
            this.model.age = this.employeeservice.employeeCache.age;
            this.model.joineddate = this.datePipe.transform(this.employeeservice.employeeCache.joineddate, 'yyyy-MM-dd');
          }
        }
        }
      });
  }
  onSubmit(){
    this.employeeservice.postEmployees(this.model)
      .subscribe(result => {
        console.log(result);
      this.router.navigate(['/employeelist'])
    });
  }
}
