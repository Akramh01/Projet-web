import { Component } from '@angular/core';
import { DashboardStatsComponent } from "../../component/component-dashboard/dashboard-stats/dashboard-stats.component";
import { DashboardMissionsComponent } from "../../component/component-dashboard/dashboard-missions/dashboard-missions.component";
import { ForumComponent } from "../../component/forum/forum.component";
@Component({
  selector: 'app-dashboard',
  imports: [DashboardStatsComponent, DashboardMissionsComponent, ForumComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
