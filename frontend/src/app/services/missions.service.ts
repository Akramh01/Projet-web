import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mission {
  idM: number;
  titre: string;
  date_debut: Date;
  date_fin: Date;
  priorite: string;
  statut: 'préparation' | 'plannifiée' | 'en cours' | 'terminée';
  anomalies: string;
}

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  private apiUrl = 'http://localhost:3000/missions';

  constructor(private http: HttpClient) { }

  getMissions(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getMissionWithName(titre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/name?nom_fr=${titre}`);
  }

  addMission(mission: Mission): Observable<any> {
    return this.http.post(`${this.apiUrl}`, mission);
  }

  deleteMission(idM: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idM}`)
  }
}
