import { Component, Input } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { DeleteCComponent } from '../delete-c/delete-c.component';
@Component({
  selector: 'app-collaborateur-card',
  templateUrl: './collaborateur-card.component.html',
  styleUrls: ['./collaborateur-card.component.scss'],
  standalone: true,
  imports:[DeleteCComponent ]
})
export class CollaborateurCardComponent {
  @Input() collaborateur: any;
  competences: any[] = [];
  showDeletePopup :boolean =false;
  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.collaborateurService.getEmployeWithId(this.collaborateur.idE).subscribe(data => {
      this.competences = data.competences;
      this.loadCompetences();
    });
  }

  // Méthode pour charger les compétences de l'employé
  loadCompetences(): void {
    this.collaborateurService.getCompetencesByEmployeId(this.collaborateur.idE).subscribe(
      (data) => {
        console.log('Données reçues :', data); // Afficher les données dans la console
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

  // Méthode pour confirmer la suppression
  onConfirmDelete(): void {
    this.collaborateurService.deleteEmploye(this.collaborateur.idE).subscribe(
      () => {
        alert('Employé supprimé avec succès !');
        this.showDeletePopup = false; // Fermer le pop-up
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