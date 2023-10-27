import { WorkingDays } from './../workingDays';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../employee';
import { DetailService } from '../services/detail.service';

interface Month {
  name: string;
  code: number
}

@Component({
  selector: 'app-calck-pay',
  templateUrl: './calck-pay.component.html',
  styleUrls: ['./calck-pay.component.css']
})
export class CalckPayComponent implements OnInit {

  @Input() calck = false;
  @Output() calckSend: EventEmitter<boolean> = new EventEmitter<boolean>();
  time: number;
  employee: Employee;
  workingDays: WorkingDays[] = [];
  newMonths: WorkingDays[] = [];
  numberDays = 0;
  calckPayPay: string;

  month: Month[];
  selectedMonth: Month | undefined;
  
  constructor(private detail: DetailService) {}

  ngOnInit() {
    this.detail.getDetail().subscribe((data) => {
      this.employee = data;
      this.workingDays = Object.values(data.workingDays!);
      this.numberDays = this.workingDays.length;
    })

    let date = new Date()
    this.time = date.getTime();

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
  }

  calckPay() {
    let pay = 0;
    for(let day of this.newMonths) {
      pay += day.allTime;
    }
    let finalPay = pay / 3600000
    return this.calckPayPay = finalPay.toFixed(2);
  }

  exit() {
    this.calckSend.emit(false);
    this.calck = false;
  }

  getMonth() {
    this.newMonths = this.workingDays.filter((month) => this.selectedMonth?.code == this.setMonth(month.in!));
    if(this.newMonths.length !== 0) {
      this.numberDays = this.newMonths.length;
    } else if(this.selectedMonth?.code == 12) {
      this.numberDays = this.workingDays.length;
    } else {
      this.numberDays = 0;
    }

    if(this.calckPayPay) {
      this.calckPayPay = "Calck";
    }
  }

  setMonth(month: number) {
    let date = new Date(month);
    return date.getMonth();
  }

  dateCompar(dateCalck: number): boolean {
    let date = new Date(dateCalck);
    let selected = this.month.find(month => month.code === date.getMonth());


    let com1 = selected?.name;
    let com2 = this.selectedMonth?.name;
    return com1 === com2;
  }
}
