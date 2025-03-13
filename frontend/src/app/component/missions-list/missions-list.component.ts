import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Mission, MissionsService } from '../../services/missions.service';
import { MissionsCardComponent } from "../missions-card/missions-card.component";
import { RequerirService, Requerir } from 'src/app/services/requerir.service';
import { AffecterService, Affecter } from 'src/app/services/affecter.service';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';


dayjs.extend(isBetween);
dayjs.extend(utc);

@Component({
  selector: 'app-missions-list',
  imports: [CommonModule, MissionsCardComponent],
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.scss']
})

export class MissionsListComponent implements OnInit, OnChanges {

  allMissions: Mission[] = [];
  filteredMissions: Mission[] = [];
  allCompetences: { [key: number]: Requerir[] } = {};
  allCollaborateurs: { [key: number]: Affecter[] } = {};

  allInfoMissions : any;

  allInfosMission: any[] = [];

  // Propriétés pour les critères de filtrage
  @Input() searchQuery: string = '';
  @Input() selectedDate: string = '';
  @Input() selectedPriority: string = '';
  @Input() selectedSkill?: number;
  @Input() selectedCollaborator?: number;

  constructor(private missionsService: MissionsService,
    private affecterService: AffecterService) {
      this.allInfoMissions = {
        missions : this.allMissions,
        competences: this.allCompetences,
        collaborateurs: this.allCollaborateurs
      }
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
      console.log("Missions récupérées :", this.allMissions);

      // Récupérer les compétences pour chaque mission
      /*this.allMissions.forEach(mission => {
        this.requerirService.getcompetencesByIdMission(mission.idM).subscribe((data) => {
          this.allCompetences[mission.idM] = data;
          this.allInfosMission[1] = this.allCompetences;
          console.log(`Compétences pour la mission ${mission.idM} :`, data);
        });
      });*/

      // Récupérer les collaborateurs pour chaque mission
      this.allMissions.forEach(mission => {
        this.affecterService.getCollaborateurByMission(mission.idM).subscribe((data) => {
          this.allCollaborateurs[mission.idM] = Array.isArray(data) ? data : [data];
          this.allInfosMission[2] = this.allCollaborateurs;
          console.log(`Collaborateurs pour la mission ${mission.idM} :`, data);
        });
      });
      this.filterMissions();
      console.log("Voici le résultat du tableau souhaité :")
      console.log(this.allInfosMission);
    });

    console.log("Voici le résultat du tableau souhaité :")
    console.log(this.allInfosMission);
  }

  filterMissions(): void {
    this.filteredMissions = this.allInfosMission[0].filter((mission: Mission) => {
      // Filtre par titre
      const matchesTitle = mission.titre.toLowerCase().includes(this.searchQuery.toLowerCase());
      console.log(`Mission ${mission.idM} - matchesTitle :`, matchesTitle);

      // Filtre par date
      const matchesDate = !this.selectedDate || this.dateMatch(mission.date_debut);
      console.log(`Mission ${mission.idM} - matchesDate :`, matchesDate);

      // Filtre par priorité
      const matchesPriority = !this.selectedPriority.toLowerCase() || mission.priorite === this.selectedPriority.toLowerCase();
      console.log(`Mission ${mission.idM} - matchesPriority :`, matchesPriority);

      // Filtre par collaborateur
      const collaborateurs = this.allInfoMissions.collaborateurs[mission.idM] || [];
      const matchesCollaborator = !this.selectedCollaborator || (Array.isArray(collaborateurs) && collaborateurs.some(collab => collab.idE === this.selectedCollaborator));
      console.log(`Mission ${mission.idM} - matchesCollaborator :`, matchesCollaborator);

      // Combiner tous les filtres
      return matchesTitle && matchesPriority && matchesDate && matchesCollaborator;
    });
    console.log("Missions filtrées :", this.filteredMissions);
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
    let dateFinSemaine = dayjs().endOf('week').subtract(1, 'day');
    console.log(`isLastWeek - dateDebutSemaine: ${dateDebutSemaine}, dateFinSemaine: ${dateFinSemaine}`);
    const result = dayjs(date).isBetween(dateDebutSemaine, dateFinSemaine, 'day', '[]');
    console.log(`isLastWeek - date: ${date}, result: ${result}`);
    return result;
  }

  isLastMonth(date: Date): boolean {
    let dateDebutMois = dayjs().startOf('month').subtract(1, 'month');
    let dateFinMois = dayjs().endOf('month').subtract(1, 'day');
    console.log(`isLastMonth - dateDebutMois: ${dateDebutMois}, dateFinMois: ${dateFinMois}`);
    const result = dayjs(date).isBetween(dateDebutMois, dateFinMois, 'day', '[]');
    console.log(`isLastMonth - date: ${date}, result: ${result}`);
    return result;
  }

  isLastSixMonths(date: Date): boolean {
    let dateDebutSixMois = dayjs().startOf('month').subtract(6, 'month');
    let dateFinSixMois = dayjs().endOf('month').subtract(1, 'day');
    console.log(`isLastSixMonths - dateDebutSixMois: ${dateDebutSixMois}, dateFinSixMois: ${dateFinSixMois}`);
    const result = dayjs(date).isBetween(dateDebutSixMois, dateFinSixMois, 'day', '[]');
    console.log(`isLastSixMonths - date: ${date}, result: ${result}`);
    return result;
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
