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
  employee: Employee;
  check = false;
  
  constructor(private popUp: PopUpService, private detail: DetailService) {}
  
  ngOnInit(): void {
    this.popUp.getCheck().subscribe((data) => {
      this.check = data;
    });

    this.detail.getDetail().subscribe((data) => {
      this.employee = data;
    })
  }
}
