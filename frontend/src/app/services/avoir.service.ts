import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Avoir {
  idE: number;
  idC: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvoirService {
  private apiUrl = 'http://localhost:3000/avoir';  // Endpoint pour lier compétences et employés

  constructor(private http: HttpClient) {}

  // Lier des compétences à un employé
//   linkEmployeCompetences(nom: string, prenom: string, nom_fr: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}`, { nom, prenom, nom_fr });
//   }

  linkEmployeCompetences(idE: number, idC: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/link`, { idE, idC });
  }


  // Rechercher des employés par compétence
  searchEmployesByCompetence(nom_fr: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employes?idC=${nom_fr}`);
  }

  // Rechercher les compétences d'un employé par ID
  getCompetencesByEmployeId(idE: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/competences?idE=${idE}`);
  }

  // getRecommendations(competencesIds: any[]): Observable<any> {
  //   const params = { competences: competencesIds.join(',') }; // Convertir en chaîne de caractères
  //   return this.http.get(`${this.apiUrl}/recommendation`, { params });
  // }
  getRecommendations(idM: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/recommendation`, {
      params: { idM: idM.toString() },
    });
  }
}