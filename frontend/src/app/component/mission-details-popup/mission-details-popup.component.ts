import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mission } from 'src/app/services/missions.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-mission-details-popup',
  imports: [CommonModule],
  templateUrl: './mission-details-popup.component.html',
  styleUrl: './mission-details-popup.component.scss'
})
export class MissionDetailsPopupComponent {

  @Input() mission!: Mission; // Mission à afficher
  @Output() close = new EventEmitter<void>(); // Événement pour fermer le pop-up

  constructor() {}

  // Méthode pour fermer le pop-up
  closePopup(): void {
    this.close.emit();
  }

}
