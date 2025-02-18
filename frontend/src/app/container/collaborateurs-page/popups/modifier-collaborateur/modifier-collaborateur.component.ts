import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AvoirService } from 'src/app/services/avoir.service';
import { forkJoin } from 'rxjs';
import { AjouterCompetencesComponent } from './ajouter-competences/ajouter-competences.component';
import { InfosCollaborateurComponent } from './infos-collaborateur/infos-collaborateur.component';
import { CompetenceCollaborateurComponent } from './competence-collaborateur/competence-collaborateur.component';


@Component({
  selector: 'app-modifier-collaborateur',
  imports: [InfosCollaborateurComponent, AjouterCompetencesComponent, CompetenceCollaborateurComponent ],
  templateUrl: './modifier-collaborateur.component.html',
  styleUrl: './modifier-collaborateur.component.scss'
})
export class ModifierCollaborateurComponent {
 
  @Output() close = new EventEmitter<void>();
  selectedCollaborateur = {}; 
  @Output() toggleDropdown = new EventEmitter<void>(); // Événement pour basculer la liste
  selectedCompetences: string[] = [];
   
     onCompetencesSelected(competences: any[]) {
       this.selectedCompetences = competences;
     }
 
   constructor(private avoirService: AvoirService) {}
   @Output() updateDone = new EventEmitter<void>();
   @Output() collaborateurAddeC = new EventEmitter<void>();
   @Input() idE!: number;
  

  lierCompetences() {
    console.log('Compétences sélectionnées:', this.selectedCompetences);
    if (!this.idE || this.selectedCompetences.length === 0) {
      alert("Veuillez sélectionner un collaborateur et au moins une compétence.");
      return;
    }

    const requests = this.selectedCompetences.map((idC) => {
      if (!idC) {
        console.error('ID de compétence invalide:', idC);
        return null;
      }
      return this.avoirService.linkEmployeCompetences(this.idE, idC);
    }).filter(req => req !== null);

    if (requests.length === 0) {
      alert('Aucune compétence valide sélectionnée.');
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        alert('Compétences liées avec succès !');
        this.updateDone.emit();
        this.close.emit();
        this.collaborateurAddeC.emit();
        
      },
      error: (err: any) => {
        console.error('Erreur lors des liaisons:', err);
        alert('Erreur lors de la liaison des compétences.');
      }
    });
  }

   closeModal() {
    this.close.emit(); // Fermer le popup
}}
