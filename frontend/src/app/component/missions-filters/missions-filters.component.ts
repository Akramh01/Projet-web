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
  searchQuery: string = '';
  selectedPriorite: string = '';
  selectedDate: Date | null = null;
  // selectedCollaborateyr: Collaborateur;
  // selectedCompetences: Competence;

  // constructor( private competenceService : CompetenceService) {}

  @Output() searchEvent = new EventEmitter<string>();
  @Output() filterEvent = new EventEmitter<any>();

  onSearch() {
    this.searchEvent.emit(this.searchQuery);
  }

  applyFilter() {
    this.filterEvent.emit(this.selectedPriorite);
    this.filterEvent.emit(this.selectedDate);
  }

}