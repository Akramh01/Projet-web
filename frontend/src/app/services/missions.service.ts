import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mission {
  idM: number;
  titre: string;
  date_debut: Date;
  date_fin: Date;
  priorite: string;
  statut: 'en préparation' | 'planifiée' | 'en cours' | 'terminée';
  anomalies: string;
}

@Injectable({
  providedIn: 'root'
})
export class MissionsService {
  private apiUrl = 'http://localhost:3000/missions';

  constructor(private http: HttpClient) { }

  getMissions(): Observable<Mission[]>{
    return this.http.get<Mission[]>(this.apiUrl);
  }
}
