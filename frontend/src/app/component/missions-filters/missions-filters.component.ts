import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Competence, CompetenceService } from '../../services/competences.service';
import { CommonModule } from '@angular/common'; // Importez CommonModule pour les *ngFor
import { CollaborateurService, Employe } from 'src/app/services/collaborateur.service';

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
  @Output() selectedCollaboratorEvent = new EventEmitter<any>();
  allCompetences: Competence[] = [];
  allCollaborateurs: Employe[] = [];

  constructor(private competenceService: CompetenceService, private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.getCompetencesList();
    this.getCollaborateursList();
  }

  getCompetencesList(): void {
    this.competenceService.getCompetences().subscribe((data) => {
      this.allCompetences = data;
    });
  }

  getCollaborateursList(): void {
    this.collaborateurService.getEmployes().subscribe((data) => {
      this.allCollaborateurs = data;
    });
  }
}