import { Component,EventEmitter,Output ,Input} from '@angular/core';
import { CollaboateurCompeComponent } from '../collaboateur-compe/collaboateur-compe.component';
import { CollaborateurInfosComponent } from '../collaborateur-infos/collaborateur-infos.component';
import { AvoirService } from 'src/app/services/avoir.service';
import { forkJoin } from 'rxjs';
import { AddCComponent } from '../add-c/add-c.component';
@Component({
  selector: 'app-formulaire-mc',
  imports: [CollaboateurCompeComponent,CollaborateurInfosComponent,AddCComponent],
  templateUrl: './formulaire-mc.component.html',
  styleUrl: './formulaire-mc.component.scss'
})
export class FormulaireMCComponent {
  @Input() idE!: number; // À recevoir du composant parent
  selectedCompetences: number[] = [];
  
  @Output() updateDone = new EventEmitter<void>();
  
  constructor(private avoirService: AvoirService) {}

  onCompetencesSelected(competences: number[]) {
    this.selectedCompetences = competences;
  }
  lierCompetences() {
    console.log('Validation - ID Employé:', this.idE);
    console.log('Validation - Compétences:', this.selectedCompetences);
    
    const idCollaborateur = 1;
    if (!idCollaborateur || isNaN(idCollaborateur)) {
     alert("ID collaborateur invalide !");
     return;
    }
    
    if (!this.selectedCompetences || this.selectedCompetences.length === 0) {
      alert("Veuillez sélectionner au moins une compétence");
      return;
    }
   
    console.log("Avant d'envoyer à l'API:", this.selectedCompetences);
    this.selectedCompetences.forEach((idC, index) => {
      this.avoirService.linkEmployeCompetences(this.idE, idC).subscribe({
        next: () => {
          // Succès pour cette compétence
          console.log(`Compétence ${idC} liée avec succès`);
        },
        error: (err) => {
          // Échec pour cette compétence
          console.error(`Échec pour idC=${idC}`, err);
          
          // Retirer la compétence invalide de la liste
          this.selectedCompetences = this.selectedCompetences.filter(c => c !== idC);
          
          // Avertir l'utilisateur
          alert(`La compétence ${idC} n'a pas pu être liée (erreur: ${err.message})`);
        }
      });
    });
    
}
  
}