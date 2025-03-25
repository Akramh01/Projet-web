import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Mission } from 'src/app/services/missions.service';
import { RequerirService } from 'src/app/services/requerir.service';
import { AffecterService } from 'src/app/services/affecter.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-mission-details-popup',
  imports: [CommonModule],
  templateUrl: './mission-details-popup.component.html',
  styleUrl: './mission-details-popup.component.scss'
})
export class MissionDetailsPopupComponent implements OnInit {

  @Input() mission!: Mission; 
  @Output() close = new EventEmitter<void>(); 

  competences: any[] = [];
  employes: any[] = [];

  constructor(private requerirService: RequerirService,
    private affecterService: AffecterService
  ) {}

  ngOnInit(): void {
    this.loadCompetences();
    this.loadEmployes();
  }

  loadCompetences(): void {
    this.requerirService.getCompetencesWithIdMission(this.mission.idM).subscribe(
      (competences) => {
        this.competences = competences;
      },
      (error) => {
        console.error('Erreur lors du chargement des compétences :', error);
      }
    );
  }

  loadEmployes(): void {
    this.affecterService.getEmployesWithIdMission(this.mission.idM).subscribe(
      (employes) => {
        this.employes = employes;
      },
      (error) => {
        console.error('Erreur lors du chargement des employés :', error);
      }
    );
  }

  closePopup(): void {
    this.close.emit();
  }

}
