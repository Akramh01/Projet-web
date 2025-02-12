import { Routes } from '@angular/router';
import { CollaborateursComponent } from './container/collaborateurs-page/collaborateurs-page.component';
import { MissionsPageComponent } from './container/missions-page/missions-page.component';
// import { DashboardComponent } from './container/dashboard-page/dashboard-page.component';
import{MissionFormComponent} from 'src/app/component/mission-form/mission-form.component';



export const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'collaborateurs-page', component: CollaborateursComponent },
  { path: 'missions-page', component: MissionsPageComponent },
  {path: 'mission-form', component: MissionFormComponent}
];

