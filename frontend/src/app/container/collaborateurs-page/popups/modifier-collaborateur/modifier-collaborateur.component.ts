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
  @Input() idE!: number;
  @Output() close = new EventEmitter<void>();
  selectedCollaborateur = {}; 
  @Output() toggleDropdown = new EventEmitter<void>(); // Événement pour basculer la liste
  selectedCompetences: number[] = [];
   
     onCompetencesSelected(competences: number[]) {
       this.selectedCompetences = competences;
     }
 
   constructor(private avoirService: AvoirService) {}
   @Output() updateDone = new EventEmitter<void>();
 
   // Corriger la méthode
   lierCompetences() {
     if (!this.idE || this.selectedCompetences.length === 0) {
       alert("Veuillez sélectionner un collaborateur et au moins une compétence");
       return;
     }
 
     const requests = this.selectedCompetences.map(idC => 
       this.avoirService.linkEmployeCompetences(this.idE, idC)
     );
 
     forkJoin(requests).subscribe({
       next: () => {
         alert('Compétences liées avec succès !');
         this.updateDone.emit();
         this.close.emit();
       },
       error: (err: any) => { // Ajouter le type explicite
         console.error('Erreur lors des liaisons:', err);
         alert('Erreur lors de la liaison des compétences');
       }
     });
   }
   closeModal() {
    this.close.emit(); // Fermer le popup
}}
