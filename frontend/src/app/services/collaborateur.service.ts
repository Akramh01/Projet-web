import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Collaborateur {
    id: number;
    nom: string;
    prenom: string;
    dateEmbauche: Date;
    statut: string;
}
@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
    private apiUrl = 'http://localhost:3000/employes';
    
      constructor(private http: HttpClient) { }
    
      getCollaborateurs(): Observable<Collaborateur[]>{
        return this.http.get<Collaborateur[]>(this.apiUrl);
      }
}