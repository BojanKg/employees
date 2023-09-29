import { EmployeesComponent } from './../employees/employees.component';
import { EmployeeService } from './../services/employee.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { Employee } from '../employee';
import { Subscription } from 'rxjs';
import { DetailService } from '../services/detail.service';
import { PopUpService } from '../services/pop-up.service';
import { WorkingDays } from '../workingDays';

@Component({
  selector: 'app-ckeck',
  templateUrl: './ckeck.component.html',
  styleUrls: ['./ckeck.component.css'],
})
export class CkeckComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvasElement') canvasElement: ElementRef;
  @ViewChild(EmployeesComponent) calckDayPay: EmployeesComponent;

  private errorSub: Subscription;
  error: string | null;
  public cameraOn: boolean = false;
  public scannedText: string;

  employee: Employee;

  constructor(private employeeService: EmployeeService, private detailService: DetailService, private popUp: PopUpService) {}

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
  
  ngAfterViewInit(): void {
    this.initCamera('environment');
  }

  async initCamera(facingMode = 'user') {
    try {
      const video = this.videoElement.nativeElement;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
  
      video.srcObject = stream;
    } catch (error) {
      console.error('Greška prilikom inicijalizacije kamere:', error);
    }
  }

  async scanText() {
    while (true) {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Crtanje videa na canvas
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      // Prepoznavanje teksta sa slike
      const { data } = await Tesseract.recognize(
        canvas,
        'eng', // Možete koristiti druge jezike zavisno od podrške Tesseract.js
        { logger: info => console.log(info) } // Opciono, koristi se za ispisivanje informacija tokom prepoznavanja
      );
      let sT = data.text;
      let part = sT.split(' ');

      this.scannedText = part.reduce((one, two) => {
        return two.length > one.length ? two: one;
      }, '');

      await new Promise(resolve => setTimeout(resolve, 1000)); // Pauza od 1 sekunde pre sledeće obrade

      this.getEmployee(this.scannedText);

      if(this.employee) {
        this.stopCamera();
        //this.detailsService.setDetail(this.employee);    
        this.calcDayPay(this.employee);
        //this.popUpCheck();
      } 
    }
  }

  toggleCamera() {
    this.cameraOn = !this.cameraOn;

    if (this.cameraOn) {
      this.stopCamera();
    } else {
      this.startCamera();
    }
  }

  private startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(error => console.error('Došlo je do greške pri uključivanju kamere:', error));
  }

  private stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.videoElement.nativeElement.srcObject = null;
    }
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
      if(!employee.checkTime?.check) {
        if(this.dateCompar(employee.checkTime!.in, dateCheck)) {
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
  }

  popUpCheck() {
    let date = new Date();
    this.popUp.setDate(date.getTime());
    this.popUp.setCheck(true);
    setTimeout(() => {
      this.popUp.setCheck(false);
    }, 5000);
  }

  dateCompar(dateChek: number, dateOut: number): boolean {
    let date1 = new Date(dateChek);
    let date2 = new Date(dateOut);

    let com1 = `${date1.getDay()}.${date1.getMonth() - 1}.${date1.getFullYear()}`;
    let com2 = `${date2.getDay()}.${date2.getMonth() - 1}.${date2.getFullYear()}`;
    return com1 === com2;
  }

  ngOnDestroy() {
    this.stopCamera();
  }
}