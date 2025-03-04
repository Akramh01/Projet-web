import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AffecterService {
  private apiUrl = 'http://localhost:3000/affecter'; 

  constructor(private http: HttpClient) {}

  
  linkMissionEmploye(idE: number, idM: number, date_affectation: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/link`, { idE, idM, date_affectation });
  }

  getEmployesWithIdMission(idM: number): Observable<any> {
    return this.http.get<{ mission: { employes: any[] } }>(`${this.apiUrl}/employes?idM=${idM}`).pipe(
      map((response) => response.mission.employes)
    );
  }

 
  deleteAffectation(idE: number, idM: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idE}/${idM}`);
  }
}