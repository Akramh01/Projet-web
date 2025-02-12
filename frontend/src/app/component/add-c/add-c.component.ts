import { Component, OnInit } from '@angular/core';

import { CompetenceService } from 'src/app/services/competences.service';
import { Competence } from 'src/app/services/competences.service';

@Component({
  selector: 'app-add-c',
  templateUrl: './add-c.component.html',
  styleUrls: ['./add-c.component.scss'],
  standalone: true,
  imports: [] // Ajout crucial de CommonModule
})
export class AddCComponent implements OnInit {
  competences: Competence[] = [];
  selectedCompetences: number[] = [];
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

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(select.selectedOptions);
    this.selectedCompetences = selectedOptions.map(option => parseInt(option.value));
  }

  getCompetenceName(id: number): string {
    const competence = this.competences.find(c => c.id === id);
    return competence ? competence.nom_fr : 'Compétence inconnue';
  }

  onSelectCompetence(id: number): void {
    this.selectedCompetences = this.selectedCompetences.filter(cId => cId !== id);
  }

  submitSelectedCompetences(): void {
    if (this.selectedCompetences.length === 0) {
      alert('Veuillez sélectionner au moins une compétence');
      return;
    }
    console.log("Compétences à envoyer :", this.selectedCompetences);
  }
}