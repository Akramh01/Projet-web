import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SupprimerCollaborateurComponent } from 'src/app/container/collaborateurs-page/popups/supprimer-collaborateur/supprimer-collaborateur.component';
import { DetailCollaborateurComponent } from 'src/app/container/collaborateurs-page/popups/detail-collaborateur/detail-collaborateur.component';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { ModifierCollaborateurComponent } from 'src/app/container/collaborateurs-page/popups/modifier-collaborateur/modifier-collaborateur.component';
import { Mission } from 'src/app/services/missions.service';

@Component({
  selector: 'app-collaborateur-card',
  templateUrl: './collaborateur-card.component.html',
  styleUrls: ['./collaborateur-card.component.scss'],
  standalone: true,
  imports: [SupprimerCollaborateurComponent, DetailCollaborateurComponent, ModifierCollaborateurComponent] 
})
export class CollaborateurCardComponent {
  @Input() collaborateur: any;
  competences: any[] = [];
  @Output() delete = new EventEmitter<void>();
  showDeletePopup: boolean = false;
  showDetailPopup: boolean = false; 
  @Input() mission!: Mission; // Mission à afficher
  showModifierPopup: boolean = false;

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.loadCompetences();
  }

  // Méthode pour charger les compétences de l'employé
  loadCompetences(): void {
    this.collaborateurService.getCompetencesByEmployeId(this.collaborateur.idE).subscribe(
      (data) => {
        console.log('Données reçues :', data);
        this.competences = data.competences;
      },
      (error) => {
        console.error('Erreur lors de la récupération des compétences :', error);
      }
    );
  }

  // Méthode pour afficher le pop-up de suppression
  openDeletePopup(): void {
    this.showDeletePopup = true;
  }

  // Ajoutez cette méthode pour ouvrir le pop-up de modification
  openModifierPopup(): void {
    this.showModifierPopup = true;
  }

  // Ajoutez cette méthode pour fermer le pop-up de modification
  closeModifierPopup(): void {
    this.showModifierPopup = false;
  }

  // Méthode pour afficher le pop-up de détail
  openDetailPopup(): void {
    this.showDetailPopup = true;
  }

  // Méthode pour fermer le pop-up de détail
  closeDetailPopup(): void {
    this.showDetailPopup = false;
  }
//Méthode pour  recharger la liste aprés ajouter des competences a un employe 
onCollaborateurAddeC(): void {
  this. loadCompetences(); // Recharge la liste des collaborateurs
}
  // Méthode pour confirmer la suppression
  onConfirmDelete(): void {
    this.collaborateurService.deleteEmploye(this.collaborateur.idE).subscribe(
      () => {
        alert('Employé supprimé avec succès !');
        this.showDeletePopup = false; // Fermer le pop-up
        this.delete.emit(); // Émettre un événement pour informer le parent
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'employé :', error);
        alert('Erreur lors de la suppression de l\'employé.');
        this.showDeletePopup = false; // Fermer le pop-up
      }
    );
  }

  // Méthode pour annuler la suppression
  onCancelDelete(): void {
    this.showDeletePopup = false; // Fermer le pop-up
  }
}