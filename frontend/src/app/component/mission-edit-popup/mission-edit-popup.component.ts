import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Mission } from 'src/app/services/missions.service';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { CommonModule } from '@angular/common';
import { Competence } from 'src/app/services/competences.service';
import { RequerirService, Requerir } from 'src/app/services/requerir.service';
import { CompetenceService } from 'src/app/services/competences.service';
import { AvoirService } from 'src/app/services/avoir.service';
import { AffecterService } from 'src/app/services/affecter.service';
import { MissionsService } from 'src/app/services/missions.service';
import { CollaborateurRecommedDetailComponent } from '../collaborateur-recommed-detail/collaborateur-recommed-detail.component'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-edit-popup',
  standalone: true, 
  imports: [FormsModule, CommonModule, CollaborateurRecommedDetailComponent],   
  templateUrl: './mission-edit-popup.component.html',
  styleUrls: ['./mission-edit-popup.component.scss']
})
export class MissionEditPopupComponent {
  @Input() mission!: Mission; 
  @Input() statut!: string;
  @Output() close = new EventEmitter<void>(); 
  @Output() save = new EventEmitter<Mission>(); 

  competences: Competence[] = []; 
  allCompetences: Competence[] = []; 
  selectedCompetence: String | null = null; 
  recommendations: any[] = [];
  isLoading = false;
  selectedPersonnelId: number | null = null; 
  date_affectation: string = '';
  showCollaboratorDetailsPopup = false; 
  selectedPersonnelIds: number[] = []; // IDs des personnels sélectionnés
  affectesPersonnel: any[] = [];

  


  constructor(
    private requerirService: RequerirService,
    private competenceService: CompetenceService,
    private avoirService: AvoirService,
    private affecterService: AffecterService,
    private missionsService: MissionsService
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

  closeCollaboratorDetailsPopup(): void {
    this.showCollaboratorDetailsPopup = false;
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
    // Vérifier si la mission et ses compétences sont valides
    if (!this.mission || !this.mission.idM) {
      console.error('ID de mission non valide :', this.mission);
      return;
    }
  
    if (!this.competences || !Array.isArray(this.competences) || this.competences.length === 0) {
      this.recommendations = [];
      return;
    }
  
    // Si tout est valide, charger les recommandations
    this.isLoading = true;
  
    this.avoirService.getRecommendations(this.mission.idM).subscribe(
      (response: any) => {
        this.affecterService.getEmployesWithIdMission(this.mission.idM).subscribe(
          (employesAffectes: any[]) => {
            const employesAffectesIds = employesAffectes.map((employe) => employe.idE);
            
            // Filter recommendations based on current competences
            this.recommendations = response.recommendations.filter(
              (recommendation: any) => {
                // Check if the recommendation matches the current competences
                const matchingCompetences = this.competences.filter(
                  comp => recommendation.competencesCorrespondantes > 0
                );
                
                // Only include if not already affected and has matching competences
                return !employesAffectesIds.includes(recommendation.employe.idE) && 
                       matchingCompetences.length > 0;
              }
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

  

  addPersonnelToMission(idE: number, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Empêche la propagation de l'événement
    }

    // Vérifier si l'employé est déjà sélectionné
    const index = this.selectedPersonnelIds.indexOf(idE);
    if (index > -1) {
      // Si déjà sélectionné, le retirer
      this.selectedPersonnelIds.splice(index, 1);
    } else {
      // Sinon, l'ajouter
      this.selectedPersonnelIds.push(idE);
    }
  }

  addSelectedPersonnelToMission(): void {
    if (this.selectedPersonnelIds.length === 0) {
      console.error('Aucun employé sélectionné');
      return;
    }

    // Processus d'ajout de chaque employé sélectionné
    const addPromises = this.selectedPersonnelIds.map(idE => 
      this.affecterService.linkMissionEmploye(idE, this.mission.idM, this.date_affectation).toPromise()
    );

    Promise.all(addPromises)
      .then(() => {
        console.log('Tous les employés ont été ajoutés à la mission');
        
        // Filtrer les recommandations pour retirer les employés ajoutés
        this.recommendations = this.recommendations.filter(
          (recommendation) => !this.selectedPersonnelIds.includes(recommendation.employe.idE)
        );

        // Réinitialiser la sélection
        this.selectedPersonnelIds = [];
        
        // Émettre l'événement de sauvegarde
        this.save.emit(this.mission);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout des employés à la mission :', error);
      });
  }

  
  openCollaboratorDetailsPopup(idE: number, event: Event): void {
    event.stopPropagation();
    if (idE) {
      this.selectedPersonnelId = idE;
      this.showCollaboratorDetailsPopup = true;
    }
  }

  addCompetence() {
    if (this.selectedCompetence) {
      const competence = this.allCompetences.find(c => c.idC === this.selectedCompetence);
      if (competence && !this.competences.some(c => c.idC === competence.idC)) {
        this.competences.push(competence);
        
        this.selectedCompetence = null;
        
        this.loadRecommendations();
      }
    }
  }

  removeCompetence(idC: string) {
    this.competences = this.competences.filter(c => c.idC !== idC);
    
   
    if (this.competences.length === 0) {
      this.recommendations = [];
      return;
    }
    
    this.loadRecommendations();
  }

  closePopup() {
    this.close.emit();
  }

  updateMissionStatut(): void {
    if (!this.mission.idM) {
      console.error('ID de mission manquant');
      return;
    }
  
    // Vérifier si des employés sont affectés à la mission
    this.affecterService.getEmployesWithIdMission(this.mission.idM).subscribe(
      (employesAffectes) => {
        if (employesAffectes.length === 0) {
          alert('La mission doit avoir des employés affectés avant d\'être planifiée.');
          return;
        }
  
        // Si des employés sont affectés, mettre à jour le statut
        this.missionsService.updateMissionStatut(this.mission.idM).subscribe(
          (response) => {
            console.log('Statut de la mission mis à jour avec succès :', response);
            this.save.emit(response); 
            this.closePopup(); 
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du statut de la mission :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés affectés :', error);
      }
    );
  }

  saveChanges(): void {
  if (this.mission.statut === 'planifiée') {
    // Cas d'une mission planifiée : vérifier que des employés sont affectés
    this.affecterService.getEmployesWithIdMission(this.mission.idM).subscribe(
      (employesAffectes) => {
        if (employesAffectes.length === 0) {
          alert('La mission doit avoir des employés affectés avant d\'être planifiée.');
          return;
        }

        // Si des employés sont affectés, mettre à jour le statut
        this.updateMissionStatut();
      },
      (error) => {
        console.error('Erreur lors de la récupération des employés affectés :', error);
      }
    );
  } else {
    // Cas d'une mission en préparation : enregistrer les compétences et autres détails
    const competencesIds = this.competences.map(c => c.idC);

    // Mettre à jour les liaisons dans la table `requerir`
    this.requerirService.updateMissionCompetences(this.mission.idM, competencesIds).subscribe(
      (response) => {
        console.log('Liaisons mises à jour avec succès :', response);
        this.updateMissionStatut();

        // Émettre un événement pour informer le composant parent
        this.save.emit(this.mission);

        this.closePopup();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour des liaisons :', error);
      }
    );
  }
}
  

}
