import { Component, Input } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-competence-collaborateur',
  imports: [],
  templateUrl: './competence-collaborateur.component.html',
  styleUrl: './competence-collaborateur.component.scss'
})
export class CompetenceCollaborateurComponent {
  @Input() collaborateurId!: number; // ID reçu du parent
  competences: any[] = []; // Liste des compétences

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    if (this.collaborateurId) {
      this.loadCompetences();
    } else {
      console.error('Aucun ID collaborateur fourni.');
    }
  }

  /**
   * Récupère les compétences du collaborateur à partir de son ID.
   */
  loadCompetences(): void {
    this.collaborateurService.getCompetencesByEmployeId(this.collaborateurId).subscribe(
      (response) => {
        if (response && Array.isArray(response.competences)) {
          this.competences = response.competences;
          console.log('Compétences chargées avec succès :', this.competences);
        } else {
          console.warn('Aucune compétence trouvée pour ce collaborateur.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des compétences :', error);
      }
    );
  }
}
