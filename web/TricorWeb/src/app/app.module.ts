import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { AddComponent } from './employee/add/add.component';
import { DashboardComponent } from './employee/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'  
import { DatePipe } from '@angular/common';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddComponent,
    DashboardComponent,
    ViewEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
