import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail-collaborateur',
  templateUrl: './detail-collaborateur.component.html',
  styleUrls: ['./detail-collaborateur.component.scss']
})
export class DetailCollaborateurComponent {
  @Input() collaborateur: any; // Recevoir les données du collaborateur
  @Input() competences: any[] = []; // Recevoir la liste des compétences
  @Output() close = new EventEmitter<void>(); // Émettre un événement pour fermer le pop-up

  constructor() {}

 
  onClose(): void {
    this.close.emit();
  }
}