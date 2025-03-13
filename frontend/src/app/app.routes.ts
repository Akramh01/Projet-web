import { Routes } from '@angular/router';
import { CollaborateursComponent } from './container/collaborateurs-page/collaborateurs-page.component';
import { MissionsPageComponent } from './container/missions-page/missions-page.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { LoginRegisterComponent } from './container/login-register/login-register/login-register.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'collaborateurs-page', component: CollaborateursComponent },
  { path: 'missions-page', component: MissionsPageComponent },
  { path: 'login-register', component: LoginRegisterComponent },
];

