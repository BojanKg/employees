import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { DetailService } from '../services/detail.service';
import { EmployeeService } from '../services/employee.service';
import { Payoff } from '../payoff';

@Component({
  selector: 'app-payoff',
  templateUrl: './payoff.component.html',
  styleUrls: ['./payoff.component.css']
})
export class PayoffComponent implements OnInit {
  payoff: Payoff[] = [];
  employee: Employee;
  date: number;

  constructor(private detailService: DetailService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.detailService.getDetail().subscribe((data) => {
      this.employee = data;
      this.payoff = Object.values(data.payoff!);
      console.log(data.payoff!, this.employee);
    });

    const date = new Date;
    this.date = date.getTime();
  }

}
