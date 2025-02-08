import { Component } from '@angular/core';
import { CollaborateurService } from '../../services/collaborateur.service';
import { CollaborateurCardComponent } from '../collaborateur-card/collaborateur-card.component';

@Component({
  selector: 'app-collaborateur-list',
  imports: [CollaborateurCardComponent],
  templateUrl: './collaborateur-list.component.html',
  styleUrl: './collaborateur-list.component.scss'
})
export class CollaborateurListComponent {
  
}
