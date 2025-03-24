import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => window.location.reload()); 
  }
}
