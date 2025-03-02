import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Mission, MissionsService } from '../../services/missions.service';
import { MissionsCardComponent } from "../missions-card/missions-card.component";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import { CollaborateurService, Employe } from 'src/app/services/collaborateur.service';
import { RequerirService, Requerir}from 'src/app/services/requerir.service';
import { AffecterService, Affecter } from 'src/app/services/affecter.service';

dayjs.extend(isBetween);
dayjs.extend(utc);

@Component({
  selector: 'app-missions-list',
  imports: [CommonModule, MissionsCardComponent],
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.scss']
})

export class MissionsListComponent implements OnInit, OnChanges  {

  allMissions: Mission[] = [];
  filteredMissions: Mission[] = [];
  allCompetences: Requerir[] = [];
  allCollaborateurs: Employe[] = [];

  allInfosMission: any[] = [];

  // Propriétés pour les critères de filtrage
  @Input() searchQuery: string = '';
  @Input() selectedDate: string = '';
  @Input() selectedPriority: string = '';
  @Input() selectedSkill: string = '';
  @Input() selectedCollaborator: string = '';

  constructor(private missionsService: MissionsService, private collaborateursService: CollaborateurService
    , private requerirService: RequerirService, private affecterService: AffecterService) {
    this.allInfosMission[0] = this.allMissions;
    this.allInfosMission[1] = this.allCompetences;
    this.allInfosMission[2] = this.allCollaborateurs;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['selectedDate'] || changes['selectedPriority'] || changes['selectedSkill'] || changes['selectedCollaborator']) {
      this.filterMissions();
    }
  }
  
  ngOnInit(): void {
    this.missionsService.getMissions().subscribe((data) => {
      this.allMissions = data;
      this.allInfosMission[0] = this.allMissions;
      this.filterMissions();

      // Récupérer les collaborateurs pour chaque mission
      this;this.allMissions.forEach(mission => {
        this.affecterService.getCollaborateurByMission(mission.idM).subscribe((data) => {
          this.allCollaborateurs[mission.idM] = data;
          this.allInfosMission[2] = this.allCollaborateurs;
        });
      });

      // Récupérer les compétences pour chaque mission
      this.allMissions.forEach(mission => {
        this.requerirService.getcompetencesByIdMission(mission.idM).subscribe((data) => {
          this.allCompetences[mission.idM] = data;
          this.allInfosMission[1] = this.allCompetences;
        });
      });
    });


    console.log("Voici le résultat du tableau souhaité :")
    console.log(this.allInfosMission);
  }

  filterMissions(): void {
    this.filteredMissions = this.allInfosMission[0].filter((mission: Mission) => {
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

  //Fonction dédié à la gestion des dates
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