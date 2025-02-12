import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-collaborateur',
  templateUrl: './detail-collaborateur.component.html',
  styleUrls: ['./detail-collaborateur.component.scss']
})
export class DetailCollaborateurComponent {
  @Input() collaborateur: any; // Reçoit les données du collaborateur
  @Input() competences: any[] = []; // Reçoit la liste des compétences
  @Output() close = new EventEmitter<void>(); // Émet un événement pour fermer le pop-up

  constructor() {}

 
  onClose(): void {
    this.close.emit();
  }
}