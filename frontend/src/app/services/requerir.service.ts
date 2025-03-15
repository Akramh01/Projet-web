import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Competence } from './competences.service';


export interface Requerir {
  idM: number;
  idC: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequerirService {
  private apiUrl = 'http://localhost:3000/requerir';

  constructor(private http: HttpClient) {}

  linkMissionCompetence(data: Requerir): Observable<any> {
    return this.http.post(`${this.apiUrl}/link`, data);
  }


  getCompetencesWithIdMission(idM: number): Observable<Competence[]> {
    const params = new HttpParams().set('idM', idM.toString());
    return this.http.get<{ competences: Competence[] }>(`${this.apiUrl}/competences/`, { params })
      .pipe(
        map(response => response.competences) // Transforme la réponse en tableau de compétences
      );
  }

  updateMissionCompetences(idM: number, competencesIds: String[]): Observable<any> {
    const body = {idM, competences: competencesIds }; // Corps de la requête
    return this.http.put(`${this.apiUrl}/update`, body);
  }

  getCompetencesByMission(idM: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/mission/competences?idM=${idM}`);
  }

  getcompetencesByIdMission(idM: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/competences?idM=${idM}`);
  }


}