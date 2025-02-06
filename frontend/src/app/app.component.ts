import { HttpClient, HttpClientModule } from '@angular/common/http';
import {Component, inject, Injectable} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a href="/">Home</a>
      |
      <a href="/user">User</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, HttpClientModule],
}) @Injectable({providedIn: 'root'})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/competences').subscribe((data) => {
      console.log(data);
    });
  }
}