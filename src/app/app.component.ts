import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './services/employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public editEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    jobTitle: '',
    imageUrl: '',
    phone: '',
    employeeCode: '',
  };
  public deleteEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    jobTitle: '',
    imageUrl: '',
    phone: '',
    employeeCode: '',
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => (this.employees = response),
      error: (error: HttpErrorResponse) => console.log(error.message),
      complete: () => console.info('complete'),
    });
  }

  onEditModal(employee: Employee): void {
    this.editEmployee = employee;
  }

  onDeleteModal(employee: Employee): void {
    this.deleteEmployee = employee;
  }

  onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
      complete: () => console.info('complete'),
    });
  }

  onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
      complete: () => console.info('complete'),
    });
  }

  onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
      complete: () => console.info('complete'),
    });
  }

  searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
