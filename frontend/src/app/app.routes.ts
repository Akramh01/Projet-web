import { Routes } from '@angular/router';
import { CollaborateursComponent } from './container/collaborateurs-page/collaborateurs-page.component';
import { MissionsPageComponent } from './container/missions-page/missions-page.component';
// import { DashboardComponent } from './container/dashboard-page/dashboard-page.component';
import { PopficheCMComponent } from './container/popfiche-cm/popfiche-cm.component';
import { PopeditCComponent } from './container/popedit-c/popedit-c.component';
import { Component } from '@angular/core';

export const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'collaborateurs-page', component: CollaborateursComponent },
  { path: 'missions-page', component: MissionsPageComponent },
  { path :'pop', component:PopficheCMComponent},
  { path :'modifier',component:PopeditCComponent}
];

