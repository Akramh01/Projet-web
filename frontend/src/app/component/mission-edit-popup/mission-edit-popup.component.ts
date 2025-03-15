import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mission } from 'src/app/services/missions.service';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { CommonModule } from '@angular/common';
import { Competence } from 'src/app/services/competences.service';
import { RequerirService, Requerir } from 'src/app/services/requerir.service';
import { CompetenceService } from 'src/app/services/competences.service';
import { AvoirService } from 'src/app/services/avoir.service';
import { AffecterService } from 'src/app/services/affecter.service';
import { MissionFormService } from 'src/app/services/mission-form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-edit-popup',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './mission-edit-popup.component.html',
  styleUrls: ['./mission-edit-popup.component.scss']
})
export class MissionEditPopupComponent {
  @Input() mission!: Mission; // Mission sélectionnée
  @Output() close = new EventEmitter<void>(); 
  @Output() save = new EventEmitter<Mission>(); 

  competences: Competence[] = []; 
  allCompetences: Competence[] = []; 
  selectedCompetence: String | null = null; 
  recommendations: any[] = [];
  isLoading = false;
  selectedPersonnelId: number | null = null; 
  date_affectation: string = '';
  


  constructor(
    private requerirService: RequerirService,
    private competenceService: CompetenceService,
    private avoirService: AvoirService,
    private affecterService: AffecterService,
    private missionFormService: MissionFormService
  ) {}

  ngOnInit() {
    this.loadCompetences().subscribe({
      next: () => {
        this.loadAllCompetences();
        this.loadRecommendations(); // Appeler loadRecommendations après avoir chargé les compétences
      },
      error: (err) => {
        console.error('Erreur lors du chargement des compétences :', err);
      }
    });
    this.date_affectation = this.getCurrentDate();
  }

  selectPersonnel(idE: number): void {
    this.selectedPersonnelId = idE;
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mois commence à 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  // Charger les compétences associées à la mission
  loadCompetences() {
    return new Observable<void>((observer) => {
      if (this.mission && this.mission.idM) {
        this.requerirService.getCompetencesWithIdMission(this.mission.idM).subscribe(
          (competences) => {
            this.competences = competences;
            console.log('Compétences associées à la mission :', this.competences);
            observer.next(); // Notifier que le chargement est terminé
            observer.complete();
          },
          (error) => {
            console.error('Erreur lors du chargement des compétences :', error);
            observer.error(error);
          }
        );
      } else {
        console.error('ID de mission non valide :', this.mission);
        observer.error('ID de mission non valide');
      }
    });
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

  loadRecommendations(): void {
    console.log('Compétences de la mission :', this.competences); // Débogage
  
    // Vérifier si la mission et ses compétences sont valides
    if (!this.mission || !this.mission.idM) {
      console.error('ID de mission non valide :', this.mission);
      return;
    }
  
    if (!this.competences || !Array.isArray(this.competences) || this.competences.length === 0) {
      console.error('Aucune compétence associée à la mission :', this.mission);
      return;
    }
  
    // Si tout est valide, charger les recommandations
    this.isLoading = true;
  
    this.avoirService.getRecommendations(this.mission.idM).subscribe(
      (response: any) => {
        this.affecterService.getEmployesWithIdMission(this.mission.idM).subscribe(
          (employesAffectes: any[]) => {
            const employesAffectesIds = employesAffectes.map((employe) => employe.idE);
            this.recommendations = response.recommendations.filter(
              (recommendation: any) => !employesAffectesIds.includes(recommendation.employe.idE)
            );
            this.isLoading = false;
          },
          (error) => {
            console.error('Erreur lors du chargement des employés affectés :', error);
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error('Erreur lors du chargement des recommandations :', error);
        this.isLoading = false;
      }
    );
  }
  

  addPersonnelToMission(): void {
    if (this.selectedPersonnelId && this.date_affectation) {
      this.affecterService
        .linkMissionEmploye(this.selectedPersonnelId, this.mission.idM, this.date_affectation)
        .subscribe(
          (response) => {
            console.log('Employé ajouté à la mission avec succès :', response);
            this.selectedPersonnelId = null;
            this.save.emit(this.mission); // Mettre à jour la mission
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'employé à la mission :', error);
            console.log('date affectation :', this.date_affectation);
          }
        );
    } else {
      console.error('Veuillez sélectionner un employé.');
    }
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
