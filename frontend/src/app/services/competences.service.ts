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

    getCompetences(): Observable<Competence[]> {
        return this.http.get<Competence[]>(`${this.apiUrl}/`);
    }
 
    getCompetenceById(id: number): Observable<Competence> {
        return this.http.get<Competence>(`${this.apiUrl}/id?idC=${id}`);
    }

    getCompetenceWithNameFr(nom_fr: string): Observable<Competence> {
        return this.http.get<Competence>(`${this.apiUrl}/nom-fr?nom_fr=${encodeURIComponent(nom_fr)}`);
    }

    getCompetenceWithNameEn(nom_en: string): Observable<Competence> {
        return this.http.get<Competence>(`${this.apiUrl}/nom-en?nom_en=${encodeURIComponent(nom_en)}`);
    }
}