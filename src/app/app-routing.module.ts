import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { DetailsComponent } from './details/details.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { AddComponent } from './add/add.component';
import { PayoffComponent } from './payoff/payoff.component';
import { AuthComponent } from './auth/auth.component';
import { CkeckComponent } from './ckeck/ckeck.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'details/:fullName/:id', component: DetailsComponent },
  { path: 'working-days/:fullName/:id', component: WorkingDaysComponent },
  { path: 'add', component: AddComponent },
  { path: 'payoff/:fullName/:id', component: PayoffComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'ckeck', component: CkeckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
