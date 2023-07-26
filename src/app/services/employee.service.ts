import { Injectable } from '@angular/core';
import { Employee } from '../employee';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { WorkingDays } from '../workingDays';
import { Payoff } from '../payoff';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees.json')
      .pipe(
      );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees/${id}.json`)
    .pipe(
    );
  }

  addEmployee(employee: Employee) {
    return this.http.post<[name: string]>(
      `https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees.json`,
      employee,
      {
        headers: new HttpHeaders({ 'body': "employees" }),
        observe: 'response',
      }
    )
    .subscribe({
      next: (responseData) => console.log(responseData),
      error: (error) => this.error.next(error.message),
    });
  }

  deleteEmployee(id: Employee) {
    return this.http
      .delete(`https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees/${id.id}.json`, {
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          console.log('Event?: ',event);
          if (event.type === HttpEventType.Sent) {
            console.log('Type?: ',event.type);
          }
          if (event.type === HttpEventType.Response) {
            console.log('Body?: ',event.body);
          }
        })
      );
  }

  editEmployee(content: Employee) {
    this.http
      .put<[name: Employee]>(
        `https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees/${content.id}.json`,
        content,
        {
          headers: new HttpHeaders({ 'body': "employees" }),
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getJobTitle(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/jobtitle.json')
      .pipe(
      );
  }

  getCheckTime(content: Employee, check: string, checkTime: number | boolean) {
    this.http
      .put<[name: number | boolean]>(
        `https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees/${content.id}/checkTime/${check}.json`,
        checkTime,
        {
          headers: new HttpHeaders({ 'body': "employees" }),
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  setWorkingDays(content: Employee, checkedTime: WorkingDays) {
    this.http
      .post<[name: string]>(
        `https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees/${content.id}/workingDays.json`,
        checkedTime,
        {
          headers: new HttpHeaders({ 'body': "employees" }),
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  setWorkingDaysUp(content: Employee, checkedTime: WorkingDays, key: string) {
    this.http
      .put<[name: string]>(
        `https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees/${content.id}/workingDays/${key}.json`,
        checkedTime,
        {
          headers: new HttpHeaders({ 'body': "employees" }),
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => this.error.next(error.message),
      });
  }

  setPayoff(content: Employee, checkedTime: Payoff) {
    this.http
      .post<[name: string]>(
        `https://employee-8c409-default-rtdb.europe-west1.firebasedatabase.app/employees/${content.id}/payoff.json`,
        checkedTime,
        {
          headers: new HttpHeaders({ 'body': "employees" }),
          observe: 'response',
        }
      )
      .subscribe({
        next: (responseData) => console.log(responseData),
        error: (error) => this.error.next(error.message),
      });
  }
  
}
