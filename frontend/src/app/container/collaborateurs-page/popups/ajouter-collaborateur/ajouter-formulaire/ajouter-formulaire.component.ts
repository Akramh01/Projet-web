import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompetenceService } from 'src/app/services/competences.service';
import { Competence } from 'src/app/services/competences.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-formulaire',
  imports: [CommonModule],
  templateUrl: './ajouter-formulaire.component.html',
  styleUrl: './ajouter-formulaire.component.scss'
})
export class AjouterFormulaireComponent implements OnInit{
  @Output() competencesSelected: EventEmitter<number[]> = new EventEmitter<number[]>();
  competences: Competence[] = [];
  selectedCompetences: number[] = [];
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
    if (event.target.checked) {
      this.selectedCompetences.push(competence.id);
      this.selectedCompetencesDetails.push(competence);
    } else {
      const index = this.selectedCompetences.indexOf(competence.id);
      if (index !== -1) {
        this.selectedCompetences.splice(index, 1);
        this.selectedCompetencesDetails = this.selectedCompetencesDetails.filter(c => c.id !== competence.id);
      }
    }
    this.emitSelectedCompetences();  // Émettre les compétences sélectionnées vers le parent
  }
  
  private emitSelectedCompetences(): void {
    this.competencesSelected.emit(this.selectedCompetences);  // Émettre les IDs des compétences sélectionnées
  }
  

  onRemoveCompetence(competenceId: number): void {
    this.selectedCompetences = this.selectedCompetences.filter(id => id !== competenceId);
    this.selectedCompetencesDetails = this.selectedCompetencesDetails.filter(c => c.id !== competenceId);
    this.emitSelectedCompetences();  // Emit the selected competences after removal
  }
}