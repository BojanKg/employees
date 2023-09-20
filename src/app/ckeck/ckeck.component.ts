import { EmployeesComponent } from './../employees/employees.component';
import { EmployeeService } from './../services/employee.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { Employee } from '../employee';
import { Subscription } from 'rxjs';
import { DetailService } from '../services/detail.service';
import { PopUpService } from '../services/pop-up.service';

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

  constructor(private employeesService: EmployeeService, private detailsService: DetailService, private popUp: PopUpService) {}

  getEmployee(id: string) {
    this.errorSub = this.employeesService.getEmployee(id)
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
    this.calckDayPay.calcDayPay(this.employee);
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
        this.detailsService.setDetail(this.employee);    
        if (this.calckDayPay) {
          // Sada možete pristupiti svojstvima i metodama calckDayPay
          this.calckDayPay.checkDayPay(this.employee);
       } else {
          console.log("calckDayPay nije inicijalizovan.");
       }
        this.popUpCheck();
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

  popUpCheck() {
    let date = new Date();
    this.popUp.setDate(date.getTime());
    this.popUp.setCheck(true);
    setTimeout(() => {
      this.popUp.setCheck(false);
    }, 5000);
  }

  ngOnDestroy() {
    this.stopCamera();
  }
}