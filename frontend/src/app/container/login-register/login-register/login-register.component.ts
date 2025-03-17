import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-register',
  imports: [FormsModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
})
export class LoginRegisterComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;

  email: string = '';
  password: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegisterClick(): void {
    this.container.nativeElement.classList.add('right-panel-active');
  }

  onLoginClick(): void {
    this.container.nativeElement.classList.remove('right-panel-active');
  }

  register(): void {
    if (!this.registerEmail || !this.registerPassword) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    this.authService.register(this.registerEmail, this.registerPassword).subscribe(
      (response) => {
        console.log('Inscription réussie', response);
        window.location.reload();
      },
      (error) => {
        console.error('Erreur lors de l\'inscription', error);
      }
    );
  }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Connexion réussie', response);
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/']).then(() => window.location.reload()); 
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = "Identifiants incorrects. Veuillez réessayer.";
        } else {
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.";
        }
        console.error('Erreur lors de la connexion', error);
      }
    );
  }
}

