import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Affecter {
    idE: number;
    idM: number;
    date_affectation: Date;
}

@Injectable({
    providedIn: 'root'
})

export class AffecterService {

    private apiUrl = 'http://localhost:3000/affecter';

    constructor(private http: HttpClient) {}

    getCollaborateurByMission(idM: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/employes?idM=${idM}`);
    }

}
