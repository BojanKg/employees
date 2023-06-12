import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DetailService } from '../services/detail.service';
import { WorkingDays } from '../workingDays';
import { Payoff } from '../payoff';

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

  loading: boolean = false;

  constructor(private employeeService: EmployeeService, private confirmationService: ConfirmationService, private messageService: MessageService, private detailService: DetailService) {}

  ngOnInit(): void {
    this.getEmployees();
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
    let key: string;
    this.detailService.setDetail(employee);
    this.detailService.getDetail().subscribe((data) => {
      workingKeys = (Object.keys(data.workingDays!));
      key = workingKeys[workingKeys.length-1];
    });
    
    if(employee.checkTime?.check) {
      let date = new Date();
      let dateIn = date.getTime();
      if(employee.checkTime.out === dateIn) {

      }
      this.employeeService.getCheckTime(employee, 'in', dateIn);
      this.employeeService.getCheckTime(employee, 'check', true);
    } else {
      let date = new Date();
      let dateOut = date.getTime();
      this.employeeService.getCheckTime(employee, 'out', dateOut);
      this.employeeService.getCheckTime(employee, 'check', false);
      this.employeeService.getCheckTime(employee, 'calck', dateOut - employee.checkTime?.in!);

      let dateCompare = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
      let dateEmployee = new Date();
      dateEmployee.setDate(employee.workingDays?.in!);
      let ec = `${dateEmployee.getDate()}.${dateEmployee.getMonth()}.${dateEmployee.getFullYear()}`;
      console.log("Datum: ", ec, "-", dateCompare)

      if(ec === dateCompare) {
        const workingDays: WorkingDays = {
          in: employee.workingDays?.in!,
          out: employee.workingDays?.out!,
          time: employee.workingDays?.time!,
          in1: employee.checkTime?.in!,
          out1: dateOut,
          time1: dateOut - employee.checkTime?.in!,
          allTime: employee.workingDays?.time! + dateOut - employee.checkTime?.in!
        }
        //this.employeeService.setWorkingDays(employee, workingDays);
      } else {
        const workingDays: WorkingDays = {
          in: employee.checkTime?.in!,
          out: dateOut,
          time: dateOut - employee.checkTime?.in!,
          in1: 0,
          out1: 0,
          time1: 0,
          allTime: dateOut - employee.checkTime?.in!
        }
        this.employeeService.setWorkingDays(employee, workingDays);
      }
    }
    this.lazyLoad();
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
}
