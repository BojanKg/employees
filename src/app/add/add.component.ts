import { WorkingDays } from './../workingDays';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addEmployeeForm: FormGroup;
  jobTitles: Employee[];
  private errorSub: Subscription;
  error: string | null;

  constructor(private employeesService: EmployeeService) {}

  ngOnInit() {
    this.addEmployeeForm = new FormGroup({
      employeeData: new FormGroup({
        fullName: new FormControl(null, [
          Validators.required
        ]),
        birthDate: new FormControl(null, [
          Validators.required
        ]),
        jobTitle: new FormControl(null, [
          Validators.required
        ]),
        pricePerHour: new FormControl(null, [
          Validators.required
        ])
      })
    });

    this.errorSub = this.employeesService.getJobTitle()
      .subscribe({
        next: (jobTitles) => {
          this.jobTitles = jobTitles;
        },
        error: (error) => {
          console.log('ERROR =', error);
          this.error = error.message;
        },
    })
  }

  onSubmit() {
    // const workingDays: WorkingDays = {
    //   in: 0,
    //   out: 0,
    //   time: 0
    // }

    const employee: Employee = {
      fullName: this.addEmployeeForm.get('employeeData.fullName')?.value,
      birthDate: this.addEmployeeForm.get('employeeData.birthDate')?.value,
      jobTitle: this.addEmployeeForm.get('employeeData.jobTitle')?.value,
      pricePerHour: this.addEmployeeForm.get('employeeData.pricePerHour')?.value,
      image: "https://i.ibb.co/frYKC5c/Windows-10-Default-Profile-Picture-svg.png",
      checkTime: {
        check: false,
        calck: 0,
        in: 0,
        out: 0,
        in1: 0,
        out1: 0,
        calck1: 0,
        allTime: 0,
      },
      //workingDays: workingDays
    }
    this.employeesService.addEmployee(employee);
    this.addEmployeeForm.reset();
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
