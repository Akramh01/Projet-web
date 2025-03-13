import { Component } from '@angular/core';
import { MissionsService } from 'src/app/services/missions.service';
@Component({
  selector: 'app-dashboard-missions',
  imports: [],
  templateUrl: './dashboard-missions.component.html',
  styleUrl: './dashboard-missions.component.scss'
})
export class DashboardMissionsComponent {
  missions: any[] = [];

  constructor(private missionService: MissionsService) {}

  ngOnInit() {
	this.loadMissions();
  }

  loadMissions(): void {
	this.missionService.getMissions().subscribe(
  	(data) => {
    	console.log('Données reçues:', data);
    	this.missions = data.slice(0, 6);
  	},
  	(error) => {
    	console.error('Erreur:', error);
  	}
	);
  }
}

