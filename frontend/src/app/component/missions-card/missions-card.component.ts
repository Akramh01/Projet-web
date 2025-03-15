import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mission } from '../../services/missions.service';
import { CommonModule } from '@angular/common';
import { MissionFormService } from 'src/app/services/mission-form.service';
@Component({
  selector: 'app-missions-card',
  imports: [ CommonModule],
  templateUrl: './missions-card.component.html',
  styleUrl: './missions-card.component.scss'
})
export class MissionsCardComponent {
  @Input() fillForm: any;
  @Input() mission!: Mission;
  @Output() editMission = new EventEmitter<Mission>();
  @Output() detailMission = new EventEmitter<Mission>();

  constructor(missionFormService: MissionFormService) {
    this.missionFormService = missionFormService;
  }
  private missionFormService: MissionFormService;

  
  openMissionDetails(): void {
    this.detailMission.emit(this.mission);
    console.log("here");
    this.missionFormService.openDetailForm();
  }

  edit() {
    this.editMission.emit(this.mission);
    console.log("nice");
    this.missionFormService.openEditForm();
  }

  

  getPrioriteClasse(priorite: string): string {
    switch(priorite) {
      case  'basse':
        return 'priorite-basse';
      case 'moyenne':
        return 'priorite-moyenne';
      case 'haute':
        return 'priorite-haute';
      default:
        return '';
    }
  }

  /*formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }*/
}

