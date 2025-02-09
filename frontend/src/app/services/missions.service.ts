import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mission {
  id: number;
  title: string;
  startDate: Date;
  priority: string;
  status: 'en préparation' | 'planifiée' | 'en cours' | 'terminée';
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
