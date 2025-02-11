import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from '../../services/collaborateur.service';
import { CollaborateurCardComponent } from '../collaborateur-card/collaborateur-card.component'; 


@Component({
  selector: 'app-collaborateur-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.scss'],
  standalone: true,
  imports: [CollaborateurCardComponent]
})

export class CollaborateurListComponent implements OnInit {
  collaborateurs: any[] = [];
  searchTerm: string = '';

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.collaborateurService.getEmployes().subscribe(data => {
      this.collaborateurs = data;
    });
    this.loadCollaborateurs();
  }

  loadCollaborateurs(): void {
    this.collaborateurService.getEmployes().subscribe((data) => {
      this.collaborateurs = data;
    });
  }

  // Méthode pour mettre à jour le terme de recherche
  updateSearchTerm(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }

  // Méthode pour gérer la recherche
  onSearch(): void {
    if (this.searchTerm) {
      // Si le terme de recherche contient un espace, on suppose que c'est un nom et un prénom
      if (this.searchTerm.includes(' ')) {
        const [nom, prenom] = this.searchTerm.split(' ');
        this.collaborateurService.searchEmployesByName(nom, prenom).subscribe((data) => {
          this.collaborateurs = [data]; // Afficher uniquement la carte de cette personne
        });
      } else {
        // Sinon, on suppose que c'est une compétence
        this.collaborateurService.searchEmployesByCompetence(this.searchTerm).subscribe((data) => {
          this.collaborateurs = data.employes; // Afficher les cartes des employés ayant cette compétence
        });
      }
    } else {
      // Si le champ de recherche est vide, recharger tous les collaborateurs
      this.loadCollaborateurs();
    }
  }
}