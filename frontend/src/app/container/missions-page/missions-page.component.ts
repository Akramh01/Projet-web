import { Component, ViewChild } from '@angular/core';
import { MissionsFiltersComponent } from "../../component/missions-filters/missions-filters.component";
import { AddMissionButtonComponent } from "../../component/add-mission-button/add-mission-button.component";
import { MissionsListComponent } from "../../component/missions-list/missions-list.component";
import { Mission } from 'src/app/services/missions.service';

@Component({
  selector: 'app-missions-page',
  imports: [
      MissionsFiltersComponent,
      AddMissionButtonComponent,
      MissionsListComponent,
    ],
  templateUrl: './missions-page.component.html',
  styleUrl: './missions-page.component.scss'
})
export class MissionsPageComponent {
  selectedMission: Mission | null = null;
  @ViewChild(MissionsListComponent) missionsList!: MissionsListComponent;

  searchQuery: string = '';
  selectedDate: string = '';
  selectedPriority: string = '';
  selectedSkill: number = 0;
  selectedCollaborator: number = 0;

  onSearchQueryEvent(searchQuery: string) {
    this.searchQuery = searchQuery;
  }

  onSelectedDateEvent(selectedDate: string) {
    this.selectedDate = selectedDate;
  }

  onSelectedPriorityEvent(selectedPriority: string) {
    this.selectedPriority = selectedPriority;
  }

  onSelectedSkillEvent(selectedSkill: number) {
    this.selectedSkill = selectedSkill;
  }

  onSelectedCollaboratorEvent(selectedCollaborator: number) {
    this.selectedCollaborator = selectedCollaborator;
  }
}

