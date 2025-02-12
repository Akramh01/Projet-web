import { Component,EventEmitter,Output } from '@angular/core';
import { CollaboateurCompeComponent } from '../collaboateur-compe/collaboateur-compe.component';

import { AvoirService } from 'src/app/services/avoir.service';
import { CollaborateurInfosComponent } from '../collaborateur-infos/collaborateur-infos.component';
import { AddCComponent } from '../add-c/add-c.component';
@Component({
  selector: 'app-formulaire-mc',
  imports: [CollaboateurCompeComponent,CollaborateurInfosComponent,AddCComponent],
  templateUrl: './formulaire-mc.component.html',
  styleUrl: './formulaire-mc.component.scss'
})
export class FormulaireMCComponent {
  collaborateurId: number = 1;
 selectedCollaborateur = {}; 
 @Output() toggleDropdown = new EventEmitter<void>(); // Événement pour basculer la liste
 selectedCompetences: number[] = [];
  
    onCompetencesSelected(competences: number[]) {
      this.selectedCompetences = competences;
    }

  constructor(private avoirService: AvoirService) {}

  
  linkCompetencesToEmploye(nom: string, prenom: string, nom_fr: string): void {
    this.selectedCompetences.forEach(competenceId => {
      this.avoirService.linkEmployeCompetences(nom, prenom, nom_fr).subscribe({
        next: () => {
          alert('Compétence liée à l\'employé avec succès !');
        },
        error: (error) => {
          console.error('Erreur lors de la liaison de la compétence :', error);
          alert('Erreur lors de la liaison de la compétence.');
        }
      });
    });
  }
}
