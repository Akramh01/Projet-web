import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mission {
  idM: number;
  titre: string;
  date_debut: Date;
  date_fin: Date;
  description: string;
  priorite: string;
  statut: 'préparation' | 'planifiée' | 'en cours' | 'terminée';
  anomalies: string;
}

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  private apiUrl = 'http://localhost:3000/missions';
  private apiUrlRequerir = 'http://localhost:3000/requerir';

  constructor(private http: HttpClient) { }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMissionWithId(idM: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/?idM=${idM}`);
  }

  getMissionWithName(titre: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/name?nom_fr=${titre}`);
  }

  addMission(mission: Mission): Observable<any> {
    return this.http.post(`${this.apiUrl}`, mission);
  }

  addCompetence(competence: any): Observable<any> {
    return this.http.post(`${this.apiUrlRequerir}/link`, competence);
  }

  deleteMission(idM: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idM}`);
  }
  
  updateMission(mission: Mission): Observable<any> {
    return this.http.put(`http://localhost:3000/missions/updatem/${mission.idM}`, mission);
  }

  updateMissionStatut(idM: number): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${idM}`, {});
  }
}
