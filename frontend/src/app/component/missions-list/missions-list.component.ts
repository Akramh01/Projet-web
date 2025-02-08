import { Component, OnInit } from '@angular/core';
import { MissionsService, Mission } from '../../services/missions.service';
import { CommonModule } from '@angular/common';
import { MissionsCardComponent } from "../missions-card/missions-card.component";

@Component({
  selector: 'app-missions-list',
  imports: [CommonModule, MissionsCardComponent],
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.scss'
})
export class MissionsListComponent implements OnInit {

  missions: Mission[] = [];
  filteredMissions: { [key: string]: Mission[] } = {};

  constructor(private missionsService: MissionsService) {}
  
  ngOnInit(): void {
    this.missionsService.getMissions().subscribe((data) => {
      this.missions = data;
    });
  }

  filterMissions() {
    const statuses = ['en préparation', 'planifiée', 'en cours', 'terminée'];
    this.filteredMissions = {};
    statuses.forEach(status => {
      this.filteredMissions[status] = this.missions.filter(m => m.status === status);
    });
  }
}
