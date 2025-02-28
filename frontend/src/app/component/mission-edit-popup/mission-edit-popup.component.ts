import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mission } from 'src/app/services/missions.service';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { CommonModule } from '@angular/common';
import { Competence } from 'src/app/services/competences.service';
import { RequerirService, Requerir } from 'src/app/services/requerir.service';
import { CompetenceService } from 'src/app/services/competences.service';

@Component({
  selector: 'app-mission-edit-popup',
  standalone: true, // Déclarer le composant comme standalone
  imports: [FormsModule, CommonModule], // Importer FormsModule et CommonModule
  templateUrl: './mission-edit-popup.component.html',
  styleUrls: ['./mission-edit-popup.component.scss']
})
export class MissionEditPopupComponent {
  @Input() mission!: Mission; // Mission sélectionnée
  @Output() close = new EventEmitter<void>(); // Événement pour fermer le popup
  @Output() save = new EventEmitter<Mission>(); // Événement pour enregistrer les modifications

  competences: Competence[] = []; // Compétences associées à la mission
  allCompetences: Competence[] = []; // Toutes les compétences disponibles
  selectedCompetence: String | null = null; // Compétence sélectionnée dans la liste déroulante

  constructor(
    private requerirService: RequerirService,
    private competenceService: CompetenceService
  ) {}

  ngOnInit() {
    this.loadCompetences();
    this.loadAllCompetences();
  }

  // Charger les compétences associées à la mission
  loadCompetences() {
    if (this.mission && this.mission.idM) {
      this.requerirService.getCompetencesWithIdMission(this.mission.idM).subscribe(
        (competences) => {
          this.competences = competences;
          console.log('Compétences associées à la mission :', this.competences);
        },
        (error) => {
          console.error('Erreur lors du chargement des compétences :', error);
        }
      );
    } else {
      console.error('ID de mission non valide :', this.mission);
    }
  }

  loadAllCompetences() {
    this.competenceService.getCompetences().subscribe(
      (competences) => {
        this.allCompetences = competences;
      },
      (error) => {
        console.error('Erreur lors du chargement des compétences :', error);
      }
    );
  }

  addCompetence() {
    if (this.selectedCompetence) {
      const competence = this.allCompetences.find(c => c.idC === this.selectedCompetence);
      if (competence && !this.competences.some(c => c.idC === competence.idC)) {
        this.competences.push(competence);
      }
    }
  }

  removeCompetence(idC: string) {
    this.competences = this.competences.filter(c => c.idC !== idC);
  }

  // Méthode pour fermer le popup
  closePopup() {
    this.close.emit();
  }

  saveChanges() {
    // Récupérer les IDs des compétences sélectionnées
    const competencesIds = this.competences.map(c => c.idC);
  
    // Mettre à jour les liaisons dans la table `requerir`
    this.requerirService.updateMissionCompetences(this.mission.idM, competencesIds).subscribe(
      (response) => {
        console.log('Liaisons mises à jour avec succès :', response);
  
        // Émettre un événement pour informer le composant parent
        this.save.emit(this.mission);
  
        // Fermer le popup
        this.closePopup();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des liaisons :', error);
      }
    );
  }
  

}
