import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  private check = new BehaviorSubject<boolean>(false);
  private multiCheck = new BehaviorSubject<boolean>(false);
  private date = new BehaviorSubject<number>(0);

  setCheck(check: boolean) {
    this.check.next(check);
  }

  getCheck() {
    return this.check.asObservable();
  }

  setMultiCheck(multiCheck: boolean) {
    this.multiCheck.next(multiCheck);
  }

  getMultiCheck() {
    return this.multiCheck.asObservable();
  }

  setDate(date: number) {
    this.date.next(date);
  }

  getDate() {
    return this.date.asObservable();
  }

  constructor() { }
}
