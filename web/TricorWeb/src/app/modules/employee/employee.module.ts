export class EmployeeModule { 
constructor(
  public employeeid: number,
  public firstname : string,
  public lastname: string,
  public gender: string,
  public age: number,
  public joineddate: string
  )  {    }
}

export class Employee { 
    employeeid: number;
    firstname : string;
    lastname: string;
    gender: string;
    age: number;
    joineddate: Date;
    action: string;
  }