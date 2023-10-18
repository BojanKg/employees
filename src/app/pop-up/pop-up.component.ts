import { Component, OnInit } from '@angular/core';
import { PopUpService } from '../services/pop-up.service';
import { Employee } from '../employee';
import { DetailService } from '../services/detail.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  time: number;
  employee: Employee;
  multiCheck = false;
  check = false;
  checkCamera = false;
  calck = false;
  
  constructor(private popUp: PopUpService, private detail: DetailService) {}
  
  ngOnInit(): void {
    this.popUp.getCheck().subscribe((data) => {
      this.check = data;
    });

    this.popUp.getCheckCamera().subscribe((data) => {
      this.checkCamera = data;
    })

    this.detail.getDetail().subscribe((data) => {
      this.employee = data;
    })

    this.popUp.getMultiCheck().subscribe((data) => {
      this.multiCheck = data;
    });

    this.popUp.getDate().subscribe((data) => {
      this.time = data;
    })

    this.popUp.getCalck().subscribe((data) => {
      this.calck = data;
    })
  }

  checkClick() {
    this.multiCheck = false;
    this.check = false;
    this.checkCamera = false;
    this.calck = false;
  }
}
