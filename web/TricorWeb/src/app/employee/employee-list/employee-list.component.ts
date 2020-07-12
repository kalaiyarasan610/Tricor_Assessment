import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../modules/employee/employee.module';
import { Subject } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
employee : Employee[];
employeeListPage : Employee[];
selectedEmployee : Employee;
isAddClicked: boolean = false;
resetFormSubject: Subject<boolean> = new Subject<boolean>();
isFirstNameAsc: boolean = false; 
isFirstNameDesc: boolean = false; 
isFirstNameShorted:boolean = false;
isLastNameAsc: boolean = false; 
isLastNameDesc: boolean = false; 
isLastNameShorted:boolean = false;
isGenderAsc: boolean = false; 
isGenderDesc: boolean = false; 
isGenderShorted:boolean = false;
isAgeAsc: boolean = false; 
isAgeDesc: boolean = false; 
isAgeShorted:boolean = false;
isJoinedDateAsc: boolean = false; 
isJoinedDateDesc: boolean = false; 
isJoinedDateShorted:boolean = false;
selectedGridPage: number = 1;
noofPages: number = 1;
noofRecords: number = 0;
paginationArray: number[] = [];
fieldtype: string = '-999';
searchingValue: string = '';
searchInPlace: boolean = false;

  constructor(private employeeservice: EmployeeService, private router: Router) {

      this.paginationArray = [];
     this.loadEmployeeList();
   }

  ngOnInit(): void {
  }
  loadEmployeeList(){
      this.paginationArray = [];
      this.employeeservice.getEmployees()
      .subscribe(result => {
          this.employee = result.map(x => Object.assign({}, x));
          this.noofRecords = result.length;
          this.noofPages = result.length % 10 == 0 ? parseInt((result.length / 10).toString()) : parseInt((result.length / 10).toString()) + 1;
          for(let i = 0; i < this.noofPages; i++)
          {
            this.paginationArray.push(i + 1);
          }
        this.onPageSelect(this.selectedGridPage)
      });
  }
  onViewClick(id: string){
    this.employeeservice.employeeCache = this.employee.filter(x=> x.employeeid.toString() == id)[0];
    console.log(this.employeeservice.employeeCache)
    this.router.navigate(['/viewemployee'])
  }
  onEditClick(id: string){
    this.isAddClicked = true;
    this.employeeservice.employeeCache =  this.employee.filter(x=> x.employeeid.toString() == id)[0];
           this.router.navigate(['/addemployee'])
           this.resetFormSubject.next(true);
  }
  onRemoveClick(id: string){
    if(confirm("Are you sure, you want delete this record!!"))
    {
      this.employeeservice.deleteEmployees(id)
        .subscribe(result => {
          console.log(result);
          this.loadEmployeeList();

      });
    }
  }
  onFirstNameClick(){
    this.isLastNameAsc = false;
    this.isLastNameDesc = false;
    this.isAgeAsc = false;
    this.isAgeDesc = false;
    this.isJoinedDateAsc = false;
    this.isJoinedDateDesc = false;
    this.isGenderAsc = false;
    this.isGenderDesc = false;

    if(!this.isFirstNameShorted && !this.isFirstNameAsc){
      this.employee = this.employee.sort((obj1, obj2) => {
          if (obj1.firstname.toLowerCase() > obj2.firstname.toLowerCase()) {
              return 1;
          }
      
          if (obj1.firstname.toLowerCase() < obj2.firstname.toLowerCase()) {
              return -1;
          }  
          return 0;
      });
      this.isFirstNameShorted = true;
      this.isFirstNameAsc = true;
      this.isFirstNameDesc = false;
    }
    else if(this.isFirstNameAsc){
        this.employee = this.employee.sort((obj1, obj2) => {
          if (obj1.firstname.toLowerCase() < obj2.firstname.toLowerCase()) {
              return 1;
          }
      
          if (obj1.firstname.toLowerCase() > obj2.firstname.toLowerCase()) {
              return -1;
          }  
          return 0;
      });
      this.isFirstNameAsc = false;
      this.isFirstNameDesc = true;
    }
    else {
        this.employee = this.employee.sort((obj1, obj2) => {
        if (obj1.firstname.toLowerCase() > obj2.firstname.toLowerCase()) {
            return 1;
        }
    
        if (obj1.firstname.toLowerCase() < obj2.firstname.toLowerCase()) {
            return -1;
        }  
        return 0;
      });
      this.isFirstNameAsc = true;
      this.isFirstNameDesc = false;
    }  
    this.onPageSelect(this.selectedGridPage)
  }
 
  onLastNameClick(){
    this.isFirstNameAsc = false;
    this.isFirstNameDesc = false;
    this.isAgeAsc = false;
    this.isAgeDesc = false;
    this.isJoinedDateAsc = false;
    this.isJoinedDateDesc = false;
    this.isGenderAsc = false;
    this.isGenderDesc = false;

    if(!this.isLastNameShorted && !this.isLastNameAsc){
      this.employee = this.employee.sort((a,b) => (a.lastname.toLowerCase() > b.lastname.toLowerCase()) ? 1 : ((b.lastname.toLowerCase() > a.lastname.toLowerCase()) ? -1 : 0));
      this.isLastNameShorted = true;
      this.isLastNameAsc = true;
      this.isLastNameDesc = false;
    }
    else if(this.isLastNameAsc){
        this.employee = this.employee.sort((a,b) => (a.lastname.toLowerCase() < b.lastname.toLowerCase()) ? 1 : ((b.lastname.toLowerCase() < a.lastname.toLowerCase()) ? -1 : 0));
        this.isLastNameAsc = false;
        this.isLastNameDesc = true;
      }
    else {
        this.employee = this.employee.sort((a,b) => (a.lastname.toLowerCase() > b.lastname.toLowerCase()) ? 1 : ((b.lastname.toLowerCase() > a.lastname.toLowerCase()) ? -1 : 0));
      this.isLastNameAsc = true;
      this.isLastNameDesc = false;
    }  
    this.onPageSelect(this.selectedGridPage)
  }
  onGenderClick(){
    this.isFirstNameAsc = false;
    this.isFirstNameDesc = false;
    this.isAgeAsc = false;
    this.isAgeDesc = false;
    this.isJoinedDateAsc = false;
    this.isJoinedDateDesc = false;
    this.isLastNameAsc = false;
    this.isLastNameDesc = false;

    if(!this.isGenderShorted && !this.isGenderAsc){
      this.employee = this.employee.sort((a,b) => (a.gender.toLowerCase() > b.gender.toLowerCase()) ? 1 : ((b.gender.toLowerCase() > a.gender.toLowerCase()) ? -1 : 0));
      this.isGenderShorted = true;
      this.isGenderAsc = true;
      this.isGenderDesc = false;
    }
    else if(this.isGenderAsc){
        this.employee = this.employee.sort((a,b) => (a.gender.toLowerCase() < b.gender.toLowerCase()) ? 1 : ((b.gender.toLowerCase() < a.gender.toLowerCase()) ? -1 : 0));
        this.isGenderAsc = false;
        this.isGenderDesc = true;
      }
    else {
        this.employee = this.employee.sort((a,b) => (a.gender.toLowerCase() > b.gender.toLowerCase()) ? 1 : ((b.gender.toLowerCase() > a.gender.toLowerCase()) ? -1 : 0));

      this.isGenderAsc = true;
      this.isGenderDesc = false;
    }  
    this.onPageSelect(this.selectedGridPage)
  }
  onAgeClick(){
    this.isFirstNameAsc = false;
    this.isFirstNameDesc = false;
    this.isLastNameAsc = false;
    this.isLastNameDesc = false;
    this.isJoinedDateAsc = false;
    this.isJoinedDateDesc = false;
    this.isGenderAsc = false;
    this.isGenderDesc = false;
    
    if(!this.isAgeShorted && !this.isAgeAsc){
      this.employee = this.employee.sort((a,b) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0));
      this.isAgeShorted = true;
      this.isAgeAsc = true;
      this.isAgeDesc = false;
    }
    else if(this.isAgeAsc){
        this.employee = this.employee.sort((a,b) => (a.age < b.age) ? 1 : ((b.age < a.age) ? -1 : 0));
        this.isAgeAsc = false;
        this.isAgeDesc = true;
      }
    else {
        this.employee = this.employee.sort((a,b) => (a.age > b.age) ? 1 : ((b.age > a.age) ? -1 : 0));

      this.isAgeAsc = true;
      this.isAgeDesc = false;
    }  
    this.onPageSelect(this.selectedGridPage)
  }
  onJoinedDateClick(){
    this.isFirstNameAsc = false;
    this.isFirstNameDesc = false;
    this.isLastNameAsc = false;
    this.isLastNameDesc = false;
    this.isAgeAsc = false;
    this.isAgeDesc = false;
    this.isGenderAsc = false;
    this.isGenderDesc = false;

    if(!this.isJoinedDateShorted && !this.isJoinedDateAsc){
      this.employee = this.employee.sort((a,b) => (a.joineddate > b.joineddate) ? 1 : ((b.joineddate > a.joineddate) ? -1 : 0));
      this.isJoinedDateShorted = true;
      this.isJoinedDateAsc = true;
      this.isJoinedDateDesc = false;
    }
    else if(this.isJoinedDateAsc){
        this.employee = this.employee.sort((a,b) => (a.joineddate < b.joineddate) ? 1 : ((b.joineddate < a.joineddate) ? -1 : 0));
        this.isJoinedDateAsc = false;
        this.isJoinedDateDesc = true;
      }
    else {
        this.employee = this.employee.sort((a,b) => (a.joineddate > b.joineddate) ? 1 : ((b.joineddate > a.joineddate) ? -1 : 0));
      this.isJoinedDateAsc = true;
      this.isJoinedDateDesc = false;
    }  
    this.onPageSelect(this.selectedGridPage)
  }
  onPreviousClick(){

  }
  onNextClick(){

  }
  onPageSelect(pageId : number){
    this.selectedGridPage = pageId;
    let tempEmp : Employee[] = [];
    console.log(this.searchInPlace)
    if(!this.searchInPlace){
      tempEmp = this.employee.map(x => Object.assign({}, x));
    }
    else{
      this.Search();
      tempEmp = this.employeeListPage.map(x => Object.assign({}, x));
    }
    this.employeeListPage  = tempEmp.splice(((pageId - 1) * 10), 10);
  }
  Search(){
    this.searchInPlace = true;
    if(this.fieldtype == '-999'){
      alert('Please select field type.')
      this.searchInPlace = false;
      return false;
    }
    if(this.searchingValue == ''){
      alert('Please enter value to search.')
      this.searchInPlace = false;
      return false;
    }
    let tempEmp = this.employee.map(x => Object.assign({}, x));
    if(this.fieldtype == 'firstname'){
      this.employeeListPage  = tempEmp.filter(x => x.firstname.toLowerCase().includes(this.searchingValue.toLowerCase()));
    }
    else if (this.fieldtype == 'lastname'){
      this.employeeListPage  = tempEmp.filter(x => x.lastname.toLowerCase().includes(this.searchingValue.toLowerCase()));
    }
    else if (this.fieldtype == 'gender'){
      this.employeeListPage  = tempEmp.filter(x => x.gender.toLowerCase() == this.searchingValue.toLowerCase());
    }
    else if (this.fieldtype == 'age'){
      this.employeeListPage  = tempEmp.filter(x => x.age.toString() == this.searchingValue);
    }
    else if (this.fieldtype == 'joineddate'){
      let tempDate = new Date(this.searchingValue);
      this.employeeListPage  = tempEmp.filter(x => x.joineddate.toString().includes(this.searchingValue));
    }
    this.paginationArray = [];
    this.noofRecords = this.employeeListPage.length;
    this.noofPages = this.employeeListPage.length % 10 == 0 ? parseInt((this.employeeListPage.length / 10).toString()) : parseInt((this.employeeListPage.length / 10).toString()) + 1;
    for(let i = 0; i < this.noofPages; i++)
    {
      this.paginationArray.push(i + 1);
    }
  }
  ClearSearch(){
    this.searchInPlace = false;
    this.searchingValue = "";
    this.fieldtype = '-999';
    this.employeeListPage = this.employee.map(x => Object.assign({}, x));
    this.paginationArray = [];
    this.noofRecords = this.employeeListPage.length;
    this.noofPages = this.employeeListPage.length % 10 == 0 ? parseInt((this.employeeListPage.length / 10).toString()) : parseInt((this.employeeListPage.length / 10).toString()) + 1;
    for(let i = 0; i < this.noofPages; i++)
    {
      this.paginationArray.push(i + 1);
    }
    this.onPageSelect(this.selectedGridPage);
  }
  gotoAddEmployee(){
    this.employeeservice.employeeCache = undefined;
           this.router.navigate(['../addemployee']);
  }
}
