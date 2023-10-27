import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { WorkingDays } from '../workingDays';
import { DetailService } from '../services/detail.service';
import { EmployeeService } from '../services/employee.service';

interface Month {
  name: string;
  code: number
}

@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.css']
})
export class WorkingDaysComponent implements OnInit {
  workingDays: WorkingDays[] = [];
  employee: Employee;
  date: number;
  month: Month[];
  selectedMonth: Month | undefined;


  constructor(private detailService: DetailService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.detailService.getDetail().subscribe((data) => {
      this.employee = data;
      this.workingDays = Object.values(data.workingDays!);
    });

    const date = new Date;
    this.date = date.getTime();

    this.month = [
      {name: 'All', code: 12},
      {name: 'January', code: 0},
      {name: 'February', code: 1},
      {name: 'March', code: 2},
      {name: 'April', code: 3},
      {name: 'May', code: 4},
      {name: 'June', code: 5},
      {name: 'July', code: 6},
      {name: 'August', code: 7},
      {name: 'September', code: 8},
      {name: 'October', code: 9},
      {name: 'November', code: 10},
      {name: 'December', code: 11},
    ]

    this.selectedMonth = {name: 'All', code: 12};
    console.log(this.selectedMonth)
  }

  getMonth() {
    console.log(this.selectedMonth?.name);
  }

  dateCompar(dateCalck: number): boolean {
    let date = new Date(dateCalck);
    let selected = this.month.find(month => month.code === date.getMonth());

    let com1 = selected?.name;
    let com2 = this.selectedMonth?.name;
    return com1 === com2;
  }
}
