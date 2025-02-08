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
    
}