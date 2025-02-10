// employe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CollaborateurService {
  private apiUrl = 'http://localhost:3000/employes'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les employés
  getEmployes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Récupérer un employé par ID
  getEmployeWithId(idE: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/id?idE=${idE}`);
  }

  // Récupérer un employé par nom et prénom
  getEmployeWithName(nom: string, prenom: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/name?nom=${nom}&prenom=${prenom}`);
  }

  // Ajouter un nouvel employé
  addEmployes(employe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, employe);
  }

  // Supprimer un employé par ID
  deleteEmploye(idE: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idE}`);
  }
}