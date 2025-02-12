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
  @Input() idE!: number;
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
      },
      error: (err: any) => { // Ajouter le type explicite
        console.error('Erreur lors des liaisons:', err);
        alert('Erreur lors de la liaison des compétences');
      }
    });
  }
}
  
