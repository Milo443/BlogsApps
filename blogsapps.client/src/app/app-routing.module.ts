import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginCreateComponent } from './components/login-create/login-create.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'LoginCreate', component: LoginCreateComponent },
  { path: '', redirectTo: '/LoginCreate', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/LoginCreate' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
