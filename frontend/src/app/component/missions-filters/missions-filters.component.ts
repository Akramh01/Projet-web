import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missions-filters',
  templateUrl: './missions-filters.component.html',
  styleUrls: ['./missions-filters.component.scss'],
  imports: [FormsModule]
})
export class MissionsFiltersComponent {
  searchQuery: string = ''; // Stocke la valeur de recherche
  @Output() searchEvent = new EventEmitter<string>(); // Émet un événement

  onSearch() {
    this.searchEvent.emit(this.searchQuery); // Envoie la recherche
  }
}