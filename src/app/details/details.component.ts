import { WorkingDays } from './../workingDays';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DetailService } from '../services/detail.service';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  employee: Employee;
  clonedEmployee: { [s: string]: Employee; } = {};
  edit = true;
  publisher: SelectItem[];
  workingDays: WorkingDays[] = [];

  date: number;

  constructor(private detailService: DetailService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.detailService.getDetail().subscribe((data) => {
      this.employee = data;
      this.workingDays = Object.values(data.workingDays!);
      console.log(data.workingDays!)
    });
    console.log(this.workingDays);
    this.publisher = [{label: 'Help Desk', value: 'Help Desk'},{label: 'IT Support', value: 'IT Support'},{label: 'Sales', value: 'Sales'}];

    const date = new Date;
    this.date = date.getTime();
  }

  editInitEmloyee() {
    this.edit = false;
  }

  editSaveEmployee(employee: Employee) {
    this.employeeService.editEmployee(employee);
    this.edit = true;
  }

  editCanselEmployee() {
      this.edit = true;
  }

  days(employee: Employee) {
    this.detailService.setDetail(employee);
  }
}
