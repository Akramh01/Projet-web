import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-mission-button',
  imports: [],
  templateUrl: './add-mission-button.component.html',
  styleUrl: './add-mission-button.component.scss'
})
export class AddMissionButtonComponent {
  @Output() addMissionEvent = new EventEmitter<void>()
  addMission() {
    this.addMissionEvent.emit();
  }
}
