import { Component } from '@angular/core';
import { DashboardStatsComponent } from "../../component/component-dashboard/dashboard-stats/dashboard-stats.component";
import { DashboardMissionsComponent } from "../../component/component-dashboard/dashboard-missions/dashboard-missions.component";
import { DashboardNotificationsComponent } from 'src/app/component/component-dashboard/dashboard-notifications/dashboard-notifications.component';
import { DashboardDiagrammeComponent } from 'src/app/component/component-dashboard/dashboard-diagramme/dashboard-diagramme.component';
@Component({
  selector: 'app-dashboard',
  imports: [DashboardStatsComponent, DashboardMissionsComponent, DashboardNotificationsComponent, DashboardDiagrammeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
