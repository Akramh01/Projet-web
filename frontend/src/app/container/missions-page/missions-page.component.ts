import { Component } from '@angular/core';
import { MissionsFiltersComponent } from "../../component/missions-filters/missions-filters.component";
import { AddMissionButtonComponent } from "../../component/add-mission-button/add-mission-button.component";
import { MissionsListComponent } from "../../component/missions-list/missions-list.component";
import { Mission } from 'src/app/services/missions.service';
import { AddMissionPopupComponent } from "../../component/add-mission-popup/add-mission-popup.component";
import { EditMissionPopupComponent } from "../../component/edit-mission-popup/edit-mission-popup.component";

@Component({
  selector: 'app-missions-page',
  imports: [
      MissionsFiltersComponent,
      AddMissionButtonComponent,
      MissionsListComponent,
      // AddMissionPopupComponent,
      // EditMissionPopupComponent
    ],
  templateUrl: './missions-page.component.html',
  styleUrl: './missions-page.component.scss'
})
export class MissionsPageComponent {
  showAddPopup = false;
  showEditPopup = false;
  selectedMission: Mission | null = null;

  openAddPopup() {
    this.showAddPopup = true;
  }

  closeAddPopup() {
    this.showAddPopup = false;
  }

  openEditPopup(mission: Mission) {
    this.selectedMission = mission;
    this.showEditPopup = true;
  }

  closeEditPopup() {
    this.showEditPopup = false;
    this.selectedMission = null;
  }
}
