import { Component, OnInit } from '@angular/core';
import { CompetenceService } from 'src/app/services/competences.service';
import { Competence } from 'src/app/services/competences.service';
@Component({
  selector: 'app-add-c',
  templateUrl: './add-c.component.html',
  styleUrls: ['./add-c.component.scss'],
  standalone: true,
  imports: [] // Ajouter les modules nécessaires
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
    const selectedId = parseInt(select.value);
    
    const index = this.selectedCompetences.indexOf(selectedId);
    
    if (index === -1) {
      this.selectedCompetences.push(selectedId);
    } else {
      this.selectedCompetences.splice(index, 1);
    }
    
    // Force la mise à jour de l'affichage
    this.selectedCompetences = [...this.selectedCompetences];
  }

  submitSelectedCompetences(): void {
    if (this.selectedCompetences.length === 0) {
      alert('Veuillez sélectionner au moins une compétence');
      return;
    }
    console.log("Compétences à envoyer :", this.selectedCompetences);
  }
  onSelectCompetence(id: number): void {
    const index = this.selectedCompetences.indexOf(id);
    if (index > -1) {
      this.selectedCompetences.splice(index, 1);
      this.selectedCompetences = [...this.selectedCompetences];
    }
  }
 
}