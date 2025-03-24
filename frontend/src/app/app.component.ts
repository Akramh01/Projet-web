import {Component, Injectable} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}) @Injectable({providedIn: 'root'})

export class AppComponent {
  constructor(private router: Router) {}

  get isLoginPage(): boolean {
    return this.router.url === '/';
  }
}
