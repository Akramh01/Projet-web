import { Component } from '@angular/core';
import { StatBoxComponent } from './stat-box/stat-box.component';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-dashboard-stats',
  imports: [StatBoxComponent],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.scss'
})
export class DashboardStatsComponent {
  tauxMissionsEnPreparation: string = '0%';
  collaborateursDisponibles: string = '0/0';
  tauxMissionsTerminees: string = '0%';

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getMissions().subscribe((missions) => {
      const missionsEnPreparation = missions.filter((mission) => mission.statut === 'préparation').length;
      const totalMissions = missions.length;
      const missionsTerminees = missions.filter((mission) => mission.statut === 'terminée').length;

      this.tauxMissionsEnPreparation = `${((missionsEnPreparation / totalMissions) * 100).toFixed(0)}%`;
      this.tauxMissionsTerminees = `${((missionsTerminees / totalMissions) * 100).toFixed(0)}%`;
    });

    this.statsService.getEmployes().subscribe((employes) => {
      const collaborateursDisponibles = employes.filter((employe) => employe.statut === 'Inactif').length;
      const totalCollaborateurs = employes.length;

      this.collaborateursDisponibles = `${collaborateursDisponibles}/${totalCollaborateurs}`;
    });
  }
}
