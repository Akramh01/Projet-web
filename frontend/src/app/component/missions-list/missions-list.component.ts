import { Component, OnInit, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { MissionsService, Mission } from '../../services/missions.service';
import { CommonModule } from '@angular/common';
import { MissionsCardComponent } from "../missions-card/missions-card.component";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isBetween);
dayjs.extend(utc);

@Component({
  selector: 'app-missions-list',
  imports: [CommonModule, MissionsCardComponent],
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.scss'] // Correction ici
})
export class MissionsListComponent implements OnInit {
  @Input() changeMode: any;
  @Input() fillForm: any;
  @Input() missions: Mission[] = []; // Liste des missions
  @Output() editMission = new EventEmitter<Mission>(); 
  @Output() detailMission = new EventEmitter<Mission>();

  // missions: Mission[] = [];
  allMissions: Mission[] = [];
  filteredMissions: Mission[] = [];

  // Propriétés pour les critères de filtrage
  @Input() searchQuery: string = '';
  @Input() selectedDate: string = '';
  @Input() selectedPriority: string = '';
  @Input() selectedSkill: string = '';
  @Input() selectedCollaborator: string = '';

  constructor(private missionsService: MissionsService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['selectedDate'] || changes['selectedPriority'] || changes['selectedSkill'] || changes['selectedCollaborator']) {
      this.filterMissions();
    }
  }
  
  ngOnInit(): void {
    if (this.missions.length > 0) {
      // If missions are passed as input, use them
      this.allMissions = this.missions;
      this.filterMissions();
    } else {
      // Otherwise, fetch missions from the service
      this.missionsService.getMissions().subscribe((data) => {
        this.allMissions = data;
        this.filterMissions();
      });
    }
  }

  updateMissions(missions: Mission[]) {
    this.allMissions = missions;
    this.filterMissions();
  }

  onMissionClicked(mission: Mission){
    this.detailMission.emit(mission);
  }

    // Méthode pour transmettre l'événement au parent
  onEditMission(mission: Mission) {
    this.editMission.emit(mission);
    console.log("what");
    }
  
  
  filterMissions(): void {
    this.filteredMissions = this.allMissions.filter(mission => {
      // Filtre par titre
      const matchesTitle = mission.titre.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Filtre par date
      const matchesDate = !this.selectedDate || this.dateMatch(mission.date_debut);

      // Filtre par priorité
      const matchesPriority = !this.selectedPriority.toLowerCase() || mission.priorite === this.selectedPriority.toLowerCase();

      // Filtre par compétence
      //const matchesSkill = !this.selectedSkill || mission.competences.includes(this.selectedSkill);

      // Filtre par collaborateur
      //const matchesCollaborator = !this.selectedCollaborator || mission.collaborateurs.includes(this.selectedCollaborator);

      // Combiner tous les filtres
      return matchesTitle && matchesPriority && matchesDate /*&& matchesSkill && matchesCollaborator*/;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Préparation':
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

  isLastWeek(date: Date): boolean {
    let dateDebutSemaine = dayjs().startOf('week').subtract(1, 'week');
    let dateFinSemaine = dayjs().startOf('week').subtract(1, 'day');
    return dayjs(date).isBetween(dateDebutSemaine, dateFinSemaine, 'day', '[]');
  }

  isLastMonth(date: Date): boolean {
    let dateDebutMois = dayjs().startOf('month').subtract(1, 'month');
    let dateFinMois = dayjs().startOf('month').subtract(1, 'day');
    return dayjs(date).isBetween(dateDebutMois, dateFinMois, 'day', '[]');
  }

  isLastSixMonths(date: Date): boolean {
    let dateDebutSemaine = dayjs().startOf('month').subtract(6, 'month');
    let dateFinSemaine = dayjs().startOf('month').subtract(1, 'day');
    return dayjs(date).isBetween(dateDebutSemaine, dateFinSemaine, 'day', '[]');
  }

  trackByMission(index: number, mission: any): string {
    return mission.id;
  }
  getFilteredMissions(statut: any): Mission[] {
    return this.filteredMissions.filter(mission => mission.statut.toLowerCase() === statut.toLowerCase());
  }
  dateMatch(date: Date): boolean {
    switch (this.selectedDate) {
      case "lastWeek":
        const isLastWeekResult = this.isLastWeek(date);
        return isLastWeekResult;
      case "lastMonth":
        const isLastMonthResult = this.isLastMonth(date);
        return isLastMonthResult;
      case "lastSixMonths":
        const isLastSixMonthsResult = this.isLastSixMonths(date);
        return isLastSixMonthsResult;
      default:
        console.log('dateMatch - default case, returning true');
        return true;
    }
  }



}