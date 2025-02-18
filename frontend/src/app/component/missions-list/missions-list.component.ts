import { Component, OnInit } from '@angular/core';
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

  allMissions: Mission[] = [];
  filteredMissions: Mission[] = [];

  constructor(private missionsService: MissionsService) {}
  
  ngOnInit(): void {
    this.missionsService.getMissions().subscribe((data) => {
      this.allMissions = data;
      this.filterMissions();
    });
  }


  filterMissions(searchQuery: string = ''
  ) {
    if(!searchQuery || searchQuery === '') {
      this.filteredMissions = this.allMissions;
      return;
    }else{
      this.filteredMissions = this.allMissions.filter(mission => {
        return mission.titre.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
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

  getFilteredMissions(statut: any): Mission[] {
    return this.filteredMissions.filter(mission => mission.statut.toLowerCase() === statut.toLowerCase());
  }
}