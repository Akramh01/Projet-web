import { HttpClient } from '@angular/common/http';
import {Component, Injectable} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { MissionsPageComponent } from "./container/missions-page/missions-page.component";
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
    MissionsPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}) @Injectable({providedIn: 'root'})

export class AppComponent {
  
}
