import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MissionsService, Mission } from '../../services/missions.service';
import { CommonModule } from '@angular/common';
import { MissionsCardComponent } from "../missions-card/missions-card.component";
import { MissionsFiltersComponent } from "../missions-filters/missions-filters.component";

@Component({
  selector: 'app-missions-list',
  imports: [CommonModule, MissionsCardComponent, /*MissionsFiltersComponent*/],
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.scss'
})
export class MissionsListComponent implements OnInit {
  @Input() changeMode: any;
  @Input() fillForm: any;

  @Input() missions: Mission[] = []; // Liste des missions
  @Output() editMission = new EventEmitter<Mission>(); // Événement pour éditer une mission

  // missions: Mission[] = [];
  filteredMissions: { [key: string]: Mission[] } = {};
  searchQuery: string = '';

  constructor(private missionsService: MissionsService) {}
  
  ngOnInit(): void {
    this.missionsService.getMissions().subscribe((data) => {
      this.missions = data;
      this.filterMissions();
    });
  }
  
  filterMissions(searchQuery: string = '') {

    if (!this.missions || this.missions.length === 0) {
      return;
    }

    const statuses = ['Préparation', 'Plannifiée', 'En cours', 'Terminée'];
    this.filteredMissions = {};

    statuses.forEach(status => {
      this.filteredMissions[status] = this.missions.filter(mission => {

        if (!mission || !mission.statut || !mission.titre) {
          return false;
        }
        const missionName = mission.titre.toLowerCase();
        const missionStatus = mission.statut.toLowerCase();

        const matchStatus = missionStatus === status.toLowerCase();
        const matchSearch = searchQuery === '' || missionName.includes(searchQuery.toLowerCase());

        return matchStatus && matchSearch;
      });
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Préparation':
        return 'status-preparation';
      case 'Plannifiée':
        return 'status-plannifiee';
      case 'En cours':
        return 'status-en-cours';
      case 'Terminée':
        return 'status-terminee';
      default:
        return '';
    }
  }

  trackByStatus(index: number, status: string): string {
    return status;
  }

  trackByMission(index: number, mission: any): string {
    return mission.id;
  }

  // Méthode pour transmettre l'événement au parent
  onEditMission(mission: Mission) {
    this.editMission.emit(mission);
  }
}