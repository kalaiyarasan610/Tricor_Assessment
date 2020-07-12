import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { AddComponent } from './employee/add/add.component';
import { DashboardComponent } from './employee/dashboard/dashboard.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

const routes: Routes = [
  { path :'', component: DashboardComponent},
  { path : 'employeelist', component: EmployeeListComponent},
  { path : 'addemployee', component: AddComponent},
  { path : 'viewemployee', component: ViewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
