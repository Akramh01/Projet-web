import { Component, OnInit } from '@angular/core';
import { MissionsService, Mission } from '../../services/missions.service';
import { CommonModule } from '@angular/common';
import { MissionsCardComponent } from "../missions-card/missions-card.component";
import { CollaborateurCardComponent } from "../collaborateur-card/collaborateur-card.component";

@Component({
  selector: 'app-missions-list',
  imports: [CommonModule, MissionsCardComponent, CollaborateurCardComponent],
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
      this.filterMissions();
      console.log("Missions chargées :", this.missions); 
      console.log("📌 Liste des statuts reçus :", this.missions.map(m => m.statut)); 
    });
  }

  filterMissions() {
    console.log("🚀 Execution de filterMissions()");
    const statuses = ['En préparation', 'Planifiée', 'En cours', 'Terminée'];
    this.filteredMissions = {};
  
    statuses.forEach(status => {
      this.filteredMissions[status] = this.missions.filter(m => {
        console.log(`🔎 Mission "${m.titre}" - statut: "${m.statut}"`);
        return m.statut && m.statut.toLowerCase() === status.toLowerCase();
      });
      console.log(`📌 Missions filtrées pour ${status} :`, this.filteredMissions[status]); 
    });
  
    console.log("✅ Résumé des missions filtrées :", this.filteredMissions);
  }
  

  getStatusClass(status: string): string {
    switch (status) {
      case 'En préparation':
        return 'status-preparation';
      case 'Planifiée':
        return 'status-planifiee';
      case 'En cours':
        return 'status-en-cours';
      case 'Terminée':
        return 'status-terminee';
      default:
        return '';
    }
  }
}
