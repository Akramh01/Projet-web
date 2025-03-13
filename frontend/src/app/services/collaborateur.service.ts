import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employe {
  idE: number;
  prenom: string;
  nom: string;
  date_embauche: string;
  statut: string;
}
@Injectable({
  providedIn: 'root'
})

export class CollaborateurService {
  private apiUrl = 'http://localhost:3000/employes'; 

  constructor(private http: HttpClient) {}

  // Récupérer tous les employés
  getEmployes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Récupérer un employé par ID
  getEmployeWithId(idE: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/id?idE=${idE}`);
  }

  // Récupérer un employé par nom et prénom
  getEmployeWithName(nom: string, prenom: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/name?nom=${nom}&prenom=${prenom}`);
  }

  // Ajouter un nouvel employé


  addEmployes(employe: any): Observable<any> {
    // Formatage spécifique pour Sequelize
    const payload = {
      prenom: employe.prenom,
      nom: employe.nom,
      date_embauche: new Date(employe.dateEmbauche), // Conversion explicite
      statut: 'actif' // Valeur par défaut obligatoire
    };
  
    return this.http.post(`${this.apiUrl}/`, payload);
  }

  // Supprimer un employé par ID
  deleteEmploye(idE: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idE}`);
  }

  // Rechercher un employé par nom et prénom
  searchEmployesByName(nom: string, prenom: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/name?nom=${nom}&prenom=${prenom}`);
  }

  // Rechercher des employés par compétence
  searchEmployesByCompetence(nom_fr: string): Observable<any> {
    return this.http.get(`http://localhost:3000/avoir/employes?idC=${nom_fr}`);
  }

  // Récupérer les compétences d'un employé par son ID
  getCompetencesByEmployeId(idE: number): Observable<any> {
    return this.http.get(`http://localhost:3000/avoir/competences?idE=${idE}`);
  }
}