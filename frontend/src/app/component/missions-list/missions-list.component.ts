import { Component, OnInit } from '@angular/core';
import { MissionsService, Mission } from '../../services/missions.service';
import { CommonModule } from '@angular/common';
import { MissionsCardComponent } from "../missions-card/missions-card.component";

@Component({
  selector: 'app-missions-list',
<<<<<<< HEAD
  imports: [CommonModule, MissionsCardComponent,],
=======
  imports: [CommonModule, MissionsCardComponent, /*CollaborateurCardComponent*/],
>>>>>>> a8902524339d0262c7444ec21750593dce16a1f9
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
    const statuses = ['Préparation', 'Plannifiée', 'En cours', 'Terminée'];
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
}
