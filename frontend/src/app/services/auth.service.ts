import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) {}

  // Inscription
  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password }, { withCredentials: true });
  }

  // Connexion
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Sauvegarde du token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Récupération du token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('user'); 
    localStorage.removeItem('token');
    window.location.reload();
  }
}
