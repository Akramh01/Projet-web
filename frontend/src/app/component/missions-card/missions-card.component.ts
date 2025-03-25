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
    this.missionFormService.openDetailForm();
  }

  edit() {
    this.editMission.emit(this.mission);
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
}

