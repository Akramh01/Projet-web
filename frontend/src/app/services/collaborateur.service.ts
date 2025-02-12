import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    // Assurez-vous que les données sont envoyées au bon format
    const employeData = {
      nom: employe.nom,
      prenom: employe.prenom,
      dateEmbauche: employe.dateEmbauche
    };
    
    return this.http.post(`${this.apiUrl}/`, employeData);
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