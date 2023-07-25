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
  
  constructor(private popUp: PopUpService, private detail: DetailService) {}
  
  ngOnInit(): void {
    this.popUp.getCheck().subscribe((data) => {
      this.check = data;
    });

    this.detail.getDetail().subscribe((data) => {
      this.employee = data;
    })

    this.popUp.getMultiCheck().subscribe((data) => {
      this.multiCheck = data;
    });

    let date = new Date();
    this.time = date.getTime();
  }

  checkClick() {
    this.multiCheck = false;
    this.check = false;
  }
}
