import { Component, OnInit, Output, EventEmitter , signal} from '@angular/core';
import { CompetenceService } from 'src/app/services/competences.service';
import { Competence } from 'src/app/services/competences.service';

@Component({
  selector: 'app-ajouter-competences',
  imports: [],
  templateUrl: './ajouter-competences.component.html',
  styleUrl: './ajouter-competences.component.scss',
  standalone: true
})
export class AjouterCompetencesComponent implements OnInit {

  @Output() competencesSelected: EventEmitter<string[]> = new EventEmitter<string[]>();
  competences: Competence[] = [];
  selectedCompetences:string[] = [];
  selectedCompetencesDetails: Competence[] = [];
  isDropdownVisible = false;
  errorMessage: string | null = null;

  constructor(private competenceService: CompetenceService) {}

  ngOnInit() {
    this.loadCompetences();
  }

  private loadCompetences(): void {
    this.competenceService.getCompetences().subscribe({
      next: (data) => {
        this.competences = data;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error("Erreur de chargement", err);
        this.errorMessage = 'Échec du chargement des compétences';
        this.competences = [];
      }
    });
  }
  
  
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onCheckboxChange(event: any, competence: Competence): void {
    if (!competence || typeof competence.idC === 'undefined') {
      console.error('Compétence invalide:', competence);
      return;
    }
  
    if (event.target.checked) {
      this.selectedCompetences.push(competence.idC);
      this.selectedCompetencesDetails.push(competence);
    } else {
      const index = this.selectedCompetences.indexOf(competence.idC);
      if (index !== -1) {
        this.selectedCompetences.splice(index, 1);
        this.selectedCompetencesDetails = this.selectedCompetencesDetails.filter(c => c.idC !== competence.idC);
      }
    }
    this.emitSelectedCompetences();
  }
  
  private emitSelectedCompetences(): void {
    this.competencesSelected.emit(this.selectedCompetences);  // Émettre les IDs des compétences sélectionnées
  }
  

  onRemoveCompetence(competenceIdC: string): void {
    this.selectedCompetences = this.selectedCompetences.filter(id => id!== competenceIdC);
    this.selectedCompetencesDetails = this.selectedCompetencesDetails.filter(c => c.idC !== competenceIdC);
    this.emitSelectedCompetences();  // Emit the selected competences after removal
  }
  trackByCompetenceId(index: number, competence: Competence): string {
    return competence.idC;  // Retourner l'ID pour suivre les éléments de manière unique
  }
  
}