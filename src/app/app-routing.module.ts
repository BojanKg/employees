import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { DetailsComponent } from './details/details.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'details/:fullName/:id', component: DetailsComponent },
  { path: 'working-days/:fullName/:id', component: WorkingDaysComponent },
  { path: 'add', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
