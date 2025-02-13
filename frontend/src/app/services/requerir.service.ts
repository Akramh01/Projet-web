import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Requerir {
  idM: number;
  idC: number;
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
}