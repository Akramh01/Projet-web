import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { CollaborateurService  } from '../../services/collaborateurs.service';
import { Competence, CompetenceService } from '../../services/competences.service'

@Component({
  selector: 'app-missions-filters',
  templateUrl: './missions-filters.component.html',
  styleUrls: ['./missions-filters.component.scss'],
  imports: [FormsModule]
})
export class MissionsFiltersComponent {

  // constructor( private competenceService : CompetenceService) {}

  @Output() searchQueryEvent = new EventEmitter<string>();
  @Output() selectedProrityEvent = new EventEmitter<any>();
  @Output() selectedDateEvent = new EventEmitter<any>();


}