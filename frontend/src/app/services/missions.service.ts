import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  // Fonction pour convertir les chaînes de caractères en objets Date
 /*private convertToDate(mission: any): Mission {
    return {
      ...mission,
      date_debut: new Date(mission.date_debut),
      date_fin: new Date(mission.date_fin)
    };
  }*/

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMissionWithName(titre: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/name?nom_fr=${titre}`);
  }

  addMission(mission: Mission): Observable<any> {
    return this.http.post(`${this.apiUrl}`, mission);
  }

  deleteMission(idM: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idM}`);
  }
}