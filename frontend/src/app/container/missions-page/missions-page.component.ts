import { Component, ViewChild } from '@angular/core';
import { MissionsFiltersComponent } from "../../component/missions-filters/missions-filters.component";
import { AddMissionButtonComponent } from "../../component/add-mission-button/add-mission-button.component";
import { MissionsListComponent } from "../../component/missions-list/missions-list.component";
import { Mission, MissionsService } from 'src/app/services/missions.service';
import {MissionFormComponent, Mode} from 'src/app/component/mission-form/mission-form.component';
import { MissionEditPopupComponent } from 'src/app/component/mission-edit-popup/mission-edit-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-missions-page',
  imports: [
      MissionsFiltersComponent,
      AddMissionButtonComponent,
      MissionsListComponent,
      MissionFormComponent,
      MissionEditPopupComponent,
      CommonModule,
    ],
  templateUrl: './missions-page.component.html',
  styleUrl: './missions-page.component.scss'
})
export class MissionsPageComponent {
  mode : Mode = 'CREATION';
  showAddPopup = false;
  showEditPopup = false;
  mission : any;
  selectedMission: Mission | null = null;
  @ViewChild(MissionsListComponent) missionsList!: MissionsListComponent;

  constructor(private missionsService: MissionsService) {}

  onSearch(searchQuery: string) {
    if (this.missionsList) {
      this.missionsList.filterMissions(searchQuery);
    }
  }
  changeMode(mode: Mode) {
    this.mode = mode;
  }
  fillForm(mission: Mission) {
    this.mission = mission;
    console.log(this.mission);
  }

  openAddPopup() {
    this.mode = 'CREATION';
    this.showAddPopup = true;
  }

  closeAddPopup() {
    this.showAddPopup = false;
  }

  openEditPopup(mission: Mission) {
    this.selectedMission = { ...mission }; // Créer une copie de la mission
    this.showEditPopup = true; // Ouvrir le popup
  }
  
  // openEditPopup(mission: Mission) {
  //   this.mode = 'MODIFICATION';
  //   this.mission = mission; // Update the mission property
  //   this.showEditPopup = true;
  // }
  

  closeEditPopup() {
    this.showEditPopup = false;
    this.selectedMission = null;
  }

  // saveMission(updatedMission: Mission) {
  //   console.log('Mission mise à jour :', updatedMission);
  //   // Envoyer les modifications au backend
  //   this.closeEditPopup(); // Fermer le popup
  // }
  
  saveMission(updatedMission: Mission) {
    console.log('Mission mise à jour :', updatedMission);
    if (updatedMission.idM) {
      this.missionsService.updateMission(updatedMission).subscribe(
        (response) => {
          console.log('Mission mise à jour avec succès :', response);
          this.closeEditPopup(); // Fermer le popup
          this.loadMissions();
          // Rafraîchir la liste des missions si nécessaire
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la mission :', error);
        }
      );
    } else {
      console.error('ID de mission manquant');
    }
  }

  loadMissions() {
    this.missionsService.getMissions().subscribe(
      (missions) => {
        this.mission = missions; // Mettre à jour la liste des missions
      },
      (error) => {
        console.error('Erreur lors du chargement des missions :', error);
      }
    );
  }

}