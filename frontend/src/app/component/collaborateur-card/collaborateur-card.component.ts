import { Component, Input } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-collaborateur-card',
  templateUrl: './collaborateur-card.component.html',
  styleUrls: ['./collaborateur-card.component.scss'],
  standalone: true
})
export class CollaborateurCardComponent {
  @Input() collaborateur: any;
  competences: any[] = [];

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

  // Méthode pour supprimer un employé
  deleteEmploye(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.collaborateurService.deleteEmploye(this.collaborateur.idE).subscribe(
        () => {
          alert('Employé supprimé avec succès !');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'employé :', error);
          alert('Erreur lors de la suppression de l\'employé.');
        }
      );
    }
  }

}