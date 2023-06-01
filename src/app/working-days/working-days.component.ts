import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { WorkingDays } from '../workingDays';
import { DetailService } from '../services/detail.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.css']
})
export class WorkingDaysComponent implements OnInit {
  workingDays: WorkingDays[] = [];
  employee: Employee;
  date: number;

  constructor(private detailService: DetailService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.detailService.getDetail().subscribe((data) => {
      this.employee = data;
      this.workingDays = Object.values(data.workingDays!);
      console.log(data.workingDays!, this.employee);
    });

    const date = new Date;
    this.date = date.getTime();
  }
}
