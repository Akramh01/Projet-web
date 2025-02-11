import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CompetenceService } from 'src/app/services/competences.service';

@Component({
  selector: 'app-add-c',
  imports: [CommonModule],
  templateUrl: './add-c.component.html',
  styleUrl: './add-c.component.scss',
  standalone: true
})
export class AddCComponent {
  competences: any[] = []; // Tableau pour stocker les compétences
  selectedCompetences: any[] = [];
  isDropdownVisible: boolean = false;

  constructor(private competenceService: CompetenceService) {}

  ngOnInit() {
    // Récupérer les compétences au moment où le composant est initialisé
    this.competenceService.getCompetences().subscribe(
      (data) => {
        this.competences = data; // Mettre les données dans le tableau
      },
      (error) => {
        console.error("Erreur lors de la récupération des compétences", error);
      }
    );
  }

  // Utilisation du service pour récupérer les compétences
  getCompetences() {
    return this.competences;
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Méthode pour gérer l'ajout/suppression des compétences sélectionnées
  toggleSelection(competence: any) {
    const index = this.selectedCompetences.indexOf(competence.id);
    if (index > -1) {
      // Si la compétence est déjà sélectionnée, on la retire
      this.selectedCompetences.splice(index, 1);
    } else {
      // Si la compétence n'est pas sélectionnée, on l'ajoute
      this.selectedCompetences.push(competence.id);
    }
  }

  // Méthode pour envoyer les compétences sélectionnées
  submitSelectedCompetences() {
    console.log("Compétences envoyées : ", this.selectedCompetences);
  }
}
