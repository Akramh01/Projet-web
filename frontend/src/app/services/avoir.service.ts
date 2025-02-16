import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {
  private apiUrl = 'http://localhost:3000/avoir';  // Endpoint pour lier compétences et employés

  constructor(private http: HttpClient) {}

  // Lier des compétences à un employé
  
// Modifier la méthode pour envoyer idE et idC au backend
linkEmployeCompetences(idE: number, idC: number): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { 
    idE: idE,
    idC: idC 
  });
}
  // Rechercher des employés par compétence
  searchEmployesByCompetence(nom_fr: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employes?idC=${nom_fr}`);
  }

  // Rechercher les compétences d'un employé par ID
  getCompetencesByEmployeId(idE: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/competences?idE=${idE}`);
  }
}
