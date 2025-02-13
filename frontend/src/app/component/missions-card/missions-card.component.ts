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
  @Input() mission!: Mission;
  @Output() editMission = new EventEmitter<Mission>();
  constructor(missionFormService: MissionFormService) {
    this.missionFormService = missionFormService;
  }
  private missionFormService: MissionFormService;
  edit() {
    this.editMission.emit(this.mission);
    this.missionFormService.openForm();
    

    console.log('Edit mission', this.mission);
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

