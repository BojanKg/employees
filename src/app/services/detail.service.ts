import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private detail = new BehaviorSubject<Employee>({});

  setDetail(detail: Employee) {
    this.detail.next(detail);
  }

  getDetail() {
    return this.detail.asObservable();
  }

  constructor() { }
}
