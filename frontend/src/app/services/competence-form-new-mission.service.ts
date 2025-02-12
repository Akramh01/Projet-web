import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenceFormNewMissionService {

  private apiUrl = 'http://localhost:3000/competences';
  constructor(private http: HttpClient) { }

  getCompetences(): Observable<any>{
    return this.http.get(this.apiUrl);
  }

}
