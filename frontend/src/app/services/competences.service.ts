import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Competence {
  id: number;
  nom_fr: string;
  nom_en: string;
}
@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
    private apiUrl = 'http://localhost:3000/competences';    
    constructor(private http: HttpClient) {}

  getCompetenceById(id: number): Observable<Competence> {
    return this.http.get<Competence>(`${this.apiUrl}/by-id?idC=${id}`);
  }
  getCompetenceWithNameFr(nom_fr: string): Observable<Competence> {
    return this.http.get<Competence>(`${this.apiUrl}/by-name?nom_fr=${encodeURIComponent(nom_fr)}`);
  }
  
  getCompetences(): Observable<Competence[]> { // Ajout du type de retour
    return this.http.get<Competence[]>(`${this.apiUrl}/`);
  }
  getCompetencesForm(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
}