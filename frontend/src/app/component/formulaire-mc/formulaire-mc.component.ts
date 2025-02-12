import { Component,EventEmitter,Output } from '@angular/core';
import { CollaboateurCompeComponent } from '../collaboateur-compe/collaboateur-compe.component';
import { AddCompCollaComponent } from '../add-comp-colla/add-comp-colla.component';
import { CollaborateurInfosComponent } from '../collaborateur-infos/collaborateur-infos.component';
@Component({
  selector: 'app-formulaire-mc',
  imports: [AddCompCollaComponent,CollaboateurCompeComponent,CollaborateurInfosComponent],
  templateUrl: './formulaire-mc.component.html',
  styleUrl: './formulaire-mc.component.scss'
})
export class FormulaireMCComponent {
  collaborateurId: number = 1;
 selectedCollaborateur = {}; 
 @Output() toggleDropdown = new EventEmitter<void>(); // Événement pour basculer la liste

  onButtonClick() {
    this.toggleDropdown.emit(); // Émet l'événement quand le bouton est cliqué
  
}
}