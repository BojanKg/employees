import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DetailService } from '../services/detail.service';
import { WorkingDays } from '../workingDays';
import { Payoff } from '../payoff';
import { PopUpService } from '../services/pop-up.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class EmployeesComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  employees: Employee[] = [];
  emKeys: any[] = [];
  private errorSub: Subscription;
  error: string | null;
  add = true;
  employeeDialog: boolean;
  employee: Employee;
  selectedEmployees: Employee[] | null;
  submitted: boolean;
  check = false;
  dateCheck: number;

  loading: boolean = false;

  constructor(private employeeService: EmployeeService, private confirmationService: ConfirmationService, private messageService: MessageService, private detailService: DetailService, private popUp: PopUpService) {}

  ngOnInit(): void {
    this.getEmployees();
    let date = new Date();
    this.dateCheck = date.getTime();
  }

  getEmployees() {
    this.errorSub = this.employeeService.getEmployees()
      .subscribe({
        next: (employee) => {
          this.employees = Object.values(employee);
          this.emKeys.push(...Object.keys(employee));
          for(let i = 0; i < this.employees.length; i++) {
            this.employees[i].id = this.emKeys[i];
          }
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      })
  }

  getEmployee(id: string) {
    this.errorSub = this.employeeService.getEmployee(id)
      .subscribe({
        next: (employee) => {
          this.employee = employee;
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      })
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  openNew() {
    this.add = !this.add;
  }

  deleteSelectedEmployees() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected employees?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.employees = this.employees.filter((val) => !this.selectedEmployees!.includes(val));
            this.selectedEmployees = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
        }
    });
    for(let employee of this.selectedEmployees!) {
      this.deleteEmployee(employee);
    }
    this.lazyLoad();
  }

  editEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.employeeDialog = true;
    this.detailService.setDetail(employee);

  }

  deleteEmployee(employee: Employee) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + employee.fullName + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.employeeService.deleteEmployee(employee).subscribe({
                next: (posts) => {
                  console.log(posts);
                },
                error: (error) => {
                  console.log('ERROR =', error);
                  this.error = error.message;
                },
              });
      
              this.employees = this.employees.filter((val) => val.id !== employee.id);
              this.employee = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
              this.lazyLoad();
          }
      });

      this.employeeService.deleteEmployee(employee).subscribe({
        next: (posts) => {
          console.log(posts);
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
      });

      this.lazyLoad();
  } 

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  calcDayPay(employee: Employee) {
    let workingKeys: string[];
    let key: string = '';
    this.detailService.setDetail(employee);
    this.detailService.getDetail().subscribe((data) => {
      workingKeys = (Object.keys(data.workingDays!));
      key = workingKeys[workingKeys.length-1];
    });

    let date = new Date();
    let dateCheck = date.getTime();

    if(!this.dateCompar(employee.checkTime!.out1, dateCheck)) {
      if(employee.checkTime?.check) {
        if(this.dateCompar(employee.checkTime.in, dateCheck)) {
          this.popUpCheck();
          this.employeeService.getCheckTime(employee, 'in1', dateCheck);
          this.employeeService.getCheckTime(employee, 'check', true);
        } else {
          this.popUpCheck();
          this.employeeService.getCheckTime(employee, 'in', dateCheck);
          this.employeeService.getCheckTime(employee, 'check', true);
        }
      } else {
        if(this.dateCompar(employee.checkTime!.out, dateCheck)) {
          this.popUpCheck();
          this.employeeService.getCheckTime(employee, 'out1', dateCheck);
          this.employeeService.getCheckTime(employee, 'check', false);
          this.employeeService.getCheckTime(employee, 'calck1', dateCheck - employee.checkTime?.in1!);
  
          const workingDays: WorkingDays = {
            in: employee.checkTime?.in!,
            out: employee.checkTime?.out!,
            time: employee.checkTime?.out! - employee.checkTime?.in!,
            in1: employee.checkTime?.in1!,
            out1: dateCheck,
            time1: dateCheck - employee.checkTime?.in1!,
            allTime: dateCheck - employee.checkTime?.in1! + employee.checkTime?.calck!
          }
          this.employeeService.setWorkingDaysUp(employee, workingDays, key);
        } else {
          this.popUpCheck();
          this.employeeService.getCheckTime(employee, 'out', dateCheck);
          this.employeeService.getCheckTime(employee, 'check', false);
          this.employeeService.getCheckTime(employee, 'calck', dateCheck - employee.checkTime?.in!);
  
          const workingDays: WorkingDays = {
            in: employee.checkTime?.in!,
            out: dateCheck,
            time: dateCheck - employee.checkTime?.in!,
            in1: 0,
            out1: 0,
            time1: 0,
            allTime: dateCheck - employee.checkTime?.in!
          }
          this.employeeService.setWorkingDays(employee, workingDays);
        }
      }
    } else {
      this.popUp.setMultiCheck(true);
      this.detailService.setDetail(employee);
      this.employee = employee;
      setTimeout(() => {
        this.popUp.setMultiCheck(false);
      }, 5000);
    }
    this.lazyLoad();
  }

  checkEmployee(id: string) {
    this.employeeService.getEmployee(id);
    let employee = this.employee;
    this.calcDayPay(employee);
  }

  salaryCalc(employee: Employee) {
    let date = new Date();
    let salary = (Object.values(employee.workingDays!));
    let allTime = [];
    for(let i = 0; i < salary.length; i++) {
      allTime.push(salary[i].allTime);
    }
    let calc =  this.calcAllTime(allTime);
    console.log('Salary: ',calc / 3600000);

    const payoff: Payoff = {
      hours: calc / 3600000,
      pay: employee.pricePerHour! * calc / 3600000,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    }

    this.employeeService.setPayoff(employee, payoff);
  }

  lazyLoad() {
    this.loading = true;
    setTimeout(() => {
      this.getEmployees();
      this.loading = false;
    }, 1000);
  }

  calcAllTime(allTime: number[]): number {
    return allTime.reduce((a, b) => a + b, 0);
  }

  dateCompar(dateChek: number, dateOut: number): boolean {
    let date1 = new Date(dateChek);
    let date2 = new Date(dateOut);

    let com1 = `${date1.getDay()}.${date1.getMonth() - 1}.${date1.getFullYear()}`;
    let com2 = `${date2.getDay()}.${date2.getMonth() - 1}.${date2.getFullYear()}`;
    return com1 === com2;
  }

  popUpCheck() {
    this.popUp.setCheck(true);
    setTimeout(() => {
      this.popUp.setCheck(false);
    }, 5000);
  }
}
