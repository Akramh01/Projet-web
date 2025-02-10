import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mission } from '../../services/missions.service';
@Component({
  selector: 'app-missions-card',
  imports: [],
  templateUrl: './missions-card.component.html',
  styleUrl: './missions-card.component.scss'
})
export class MissionsCardComponent {
  @Input() mission!: Mission;
  @Output() editMission = new EventEmitter<Mission>();
  edit() {
    this.editMission.emit(this.mission);
  }
}

