import { Component, ViewChild } from '@angular/core';
import { MissionsFiltersComponent } from "../../component/missions-filters/missions-filters.component";
import { AddMissionButtonComponent } from "../../component/add-mission-button/add-mission-button.component";
import { MissionsListComponent } from "../../component/missions-list/missions-list.component";
import { Mission, MissionsService } from 'src/app/services/missions.service';
import {MissionFormComponent} from 'src/app/component/mission-form/mission-form.component';
import { MissionEditPopupComponent } from 'src/app/component/mission-edit-popup/mission-edit-popup.component';
import { MissionDetailsPopupComponent } from 'src/app/component/mission-details-popup/mission-details-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missions-page',
  imports: [
      MissionsFiltersComponent,
      AddMissionButtonComponent,
      MissionsListComponent,
      MissionFormComponent,
      MissionEditPopupComponent,
      MissionDetailsPopupComponent,
      CommonModule,
    ],
  templateUrl: './missions-page.component.html',
  styleUrl: './missions-page.component.scss'
})
export class MissionsPageComponent {
  missions: Mission[] = [];
  showAddPopup = false;
  showEditPopup = false;
  showDetailsPopup = false;
  mission : Mission | null = null;
  selectedMission: Mission | null = null;
  @ViewChild(MissionsListComponent) missionsList!: MissionsListComponent;

  searchQuery: string = '';
  selectedDate: string = '';
  selectedPriority: string = '';
  selectedSkill: string = '';
  selectedCollaborator: string = '';
  constructor(private missionsService: MissionsService) {}
  onSearchQueryEvent(searchQuery: string) {
    this.searchQuery = searchQuery;
  }
  fillForm(mission: Mission) {
    this.mission = mission;
    console.log(this.mission);
  }
  onSelectedDateEvent(selectedDate: string) {
    this.selectedDate = selectedDate;
  }
  openAddPopup() {
    this.showAddPopup = true;
  }

  closeAddPopup() {
    this.showAddPopup = false;
  }

  openEditPopup(mission: Mission) {
    this.selectedMission = { ...mission }; 
    this.showEditPopup = true; 
    this.showDetailsPopup = false;
    
  }
  onSelectedPriorityEvent(selectedPriority: string) {
    this.selectedPriority = selectedPriority;
  }

  onSelectedSkillEvent(selectedSkill: string) {
    this.selectedSkill = selectedSkill;
  }
  onSelectedCollaboratorEvent(selectedCollaborator: string) {
    this.selectedCollaborator = selectedCollaborator;
  }

  closeEditPopup() {
    this.showEditPopup = false;
    this.selectedMission = null;
  }
  
  saveMission(updatedMission: Mission) {
    console.log('Mission mise à jour :', updatedMission);
  
    // Trouver l'index de la mission mise à jour dans la liste
    const index = this.missions.findIndex(m => m.idM === updatedMission.idM);
  
    if (index !== -1) {
      // Mettre à jour la mission dans la liste locale
      this.missions[index] = updatedMission;
    } else {
      // Si la mission n'existe pas dans la liste, l'ajouter
      this.missions.push(updatedMission);
    }
  
    // Optionnel : Recharger la liste des missions depuis le serveur
    this.loadMissions();
  
    // Fermer le popup
    this.closeEditPopup();
  }

  loadMissions() {
    this.missionsService.getMissions().subscribe(
      (missions) => {
        this.missions = missions; // Correctly update the missions array
        // Optional: If you have a reference to the missions list component, you can directly update it
        if (this.missionsList) {
          this.missionsList.updateMissions(missions);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des missions :', error);
      }
    );
  }

  openMissionDetails(mission: Mission): void {
    this.selectedMission = mission;
    this.showDetailsPopup = true;
    this.showEditPopup = false; 
    
  }

  onMissionSelected(mission: Mission): void {
    this.selectedMission = mission;
  }

  closeMissionDetails(): void {
    this.showDetailsPopup = false;
    this.selectedMission = null;
  }

}