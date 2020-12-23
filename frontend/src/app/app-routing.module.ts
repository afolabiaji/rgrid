import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { PostVerifyComponent } from './pages/post-verify/post-verify.component';
import { PreVerifyComponent } from './pages/pre-verify/pre-verify.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

import { AuthGuard } from './services/auth-guard.service'

const routes: Routes = [
  {path: '', component: SignUpComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'pre-verify', component: PreVerifyComponent},
  {path: 'post-verify/:id/:token', component: PostVerifyComponent},
  {path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
