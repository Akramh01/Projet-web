import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Competence, CompetenceService } from '../../services/competences.service';
import { CommonModule } from '@angular/common'; // Importez CommonModule

@Component({
  selector: 'app-missions-filters',
  templateUrl: './missions-filters.component.html',
  styleUrls: ['./missions-filters.component.scss'],
  imports: [FormsModule,  CommonModule]
})
export class MissionsFiltersComponent implements OnInit {

  @Output() searchQueryEvent = new EventEmitter<string>();
  @Output() selectedProrityEvent = new EventEmitter<any>();
  @Output() selectedDateEvent = new EventEmitter<any>();
  @Output() selectedSkillEvent = new EventEmitter<any>();
  allCompetences: Competence[] = [];

  constructor(private competenceService: CompetenceService) {}

  ngOnInit(): void {
    this.getCompetencesList();
  }

  getCompetencesList(): void {
    this.competenceService.getCompetences().subscribe((data) => {
      this.allCompetences = data;
      console.log(this.allCompetences);
    });
  }
}