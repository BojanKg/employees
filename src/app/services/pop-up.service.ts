import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  private check = new BehaviorSubject<boolean>(false);

  setCheck(check: boolean) {
    this.check.next(check);
  }

  getCheck() {
    return this.check.asObservable();
  }

  constructor() { }
}