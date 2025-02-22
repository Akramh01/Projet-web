import { Component } from '@angular/core';
import { StatBoxComponent } from './stat-box/stat-box.component';

@Component({
  selector: 'app-dashboard-stats',
  imports: [StatBoxComponent],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.scss'
})
export class DashboardStatsComponent {

}
