import { Component, EventEmitter, Output } from '@angular/core';
import { MissionFormService } from 'src/app/services/mission-form.service';

@Component({
  selector: 'app-add-mission-button',
  imports: [],
  templateUrl: './add-mission-button.component.html',
  styleUrl: './add-mission-button.component.scss'
})

export class AddMissionButtonComponent {
  constructor(private missionFormService: MissionFormService) {}

  openMissionForm() {
    this.missionFormService.openForm(); 


  // @Output() addMissionEvent = new EventEmitter<void>()
  // addMission() {
  //   this.addMissionEvent.emit();
  }

  
}
