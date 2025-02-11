import { Component } from '@angular/core';
import { CollaboateurCompeComponent } from '../collaboateur-compe/collaboateur-compe.component';
import { AddCompCollaComponent } from '../add-comp-colla/add-comp-colla.component';
@Component({
  selector: 'app-formulaire-mc',
  imports: [AddCompCollaComponent,CollaboateurCompeComponent],
  templateUrl: './formulaire-mc.component.html',
  styleUrl: './formulaire-mc.component.scss'
})
export class FormulaireMCComponent {

}
