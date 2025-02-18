import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from '../../services/collaborateur.service';
import { CollaborateurCardComponent } from '../collaborateur-card/collaborateur-card.component'; 
import { AjouterCollaborateurComponent } from 'src/app/container/collaborateurs-page/popups/ajouter-collaborateur/ajouter-collaborateur.component';


@Component({
  selector: 'app-collaborateur-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.scss'],
  standalone: true,
  imports: [CollaborateurCardComponent, AjouterCollaborateurComponent]
})

export class CollaborateurListComponent implements OnInit {
  collaborateurs: any[] = [];
  searchTerm: string = '';
  showAddPopup: boolean = false;

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.loadCollaborateurs();
  }

  loadCollaborateurs(): void {
    this.collaborateurService.getEmployes().subscribe((data) => {
      this.collaborateurs = data;
    });
  }

  // Méthode pour recharger la liste après suppression
  onDeleteCollaborateur(): void {
    this.loadCollaborateurs();
  }

  // Méthode pour recharger la liste après ajout
  onCollaborateurAdded(): void {
    this.loadCollaborateurs(); // Recharge la liste des collaborateurs
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

  openAddPopup(): void {
    this.showAddPopup = true;
  }

  // Méthode pour fermer le pop-up de détail
  closeAddPopup(): void {
    this.showAddPopup = false;
  }

}