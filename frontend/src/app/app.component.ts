import { HttpClient } from '@angular/common/http';
import {Component, Injectable} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { MissionsPageComponent } from "./container/missions-page/missions-page.component";

@Component({
  selector: 'app-root',
  template: `
    <app-missions-page></app-missions-page>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, MissionsPageComponent],
}) @Injectable({providedIn: 'root'})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/competences').subscribe((data) => {
      console.log(data);
    });
  }
}