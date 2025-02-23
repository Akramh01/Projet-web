import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/missions`);
  }

  getEmployes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employes`);
  }
}