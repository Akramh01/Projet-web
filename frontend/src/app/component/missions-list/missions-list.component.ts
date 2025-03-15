import { Component, OnInit, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { MissionsService, Mission } from '../../services/missions.service';
import { CommonModule } from '@angular/common';
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

  @Input() changeMode: any;
  @Input() fillForm: any;
  @Input() missions: Mission[] = []; // Liste des missions
  @Output() editMission = new EventEmitter<Mission>(); 
  @Output() detailMission = new EventEmitter<Mission>();

  allMissions: Mission[] = [];
  filteredMissions: Mission[] = [];
  allCompetences: { [key: number]: Requerir[] } = {};
  allCollaborateurs: { [key: number]: Affecter[] } = {};

  allInfoMissions : any;

  // Propriétés pour les critères de filtrage
  @Input() searchQuery: string = '';
  @Input() selectedDate: string = '';
  @Input() selectedPriority: string = '';
  @Input() selectedSkill: string = '';
  @Input() selectedCollaborator: string ='';

  constructor(private missionsService: MissionsService,
    private affecterService: AffecterService, private requerirService: RequerirService) {
      this.allInfoMissions = {
        missions : this.allMissions,
        competences: this.allCompetences,
        collaborateurs: this.allCollaborateurs
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] || changes['selectedDate'] || changes['selectedPriority'] ||
       changes['selectedSkill'] || changes['selectedCollaborator']) {
      this.filterMissions();
    }
  }

  ngOnInit(): void {
    this.missionsService.getMissions().subscribe((data) => {
      this.allMissions = data;
      this.allInfoMissions.missions = this.allMissions;
      console.log("Missions récupérées :", this.allMissions);

      // Récupérer les compétences pour chaque mission
      this.allMissions.forEach(mission => {
        this.requerirService.getcompetencesByIdMission(mission.idM).subscribe((data) => {
          this.allCompetences[mission.idM] = Array.isArray(data) ? data : [data];
          this.allInfoMissions.competences = this.allCompetences;
          console.log(`Compétences pour la mission ${mission.idM} :`, data);
        });
      });

      // Récupérer les collaborateurs pour chaque mission
      this.allMissions.forEach(mission => {
        this.affecterService.getCollaborateurByMission(mission.idM).subscribe((data) => {
          this.allCollaborateurs[mission.idM] = Array.isArray(data) ? data : [data];
          this.allInfoMissions.collaborateurs = this.allCollaborateurs;
          console.log(`Collaborateurs pour la mission ${mission.idM} :`, data);
        });
      });
      this.filterMissions();
      console.log("Voici le résultat du tableau souhaité :")
      console.log(this.allInfoMissions);
    });

    console.log("Voici le résultat du tableau souhaité :")
    console.log(this.allInfoMissions);

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
    this.filteredMissions = this.allInfoMissions.missions.filter((mission: Mission) => {
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
      let matchesCollaborator = true;
  
      // Sinon, on vérifie uniquement les collaborateurs associés à la mission en cours
      if (this.selectedCollaborator) {

        // Récupère les collaborateurs pour la mission courante en utilisant mission.idM
        const collaborateursForMission: any = this.allInfoMissions.collaborateurs[mission.idM];
        console.log(`Compétences pour la mission ${mission.idM} :`, collaborateursForMission);

        if (Array.isArray(collaborateursForMission) && collaborateursForMission.length > 0) {
          // Utilisation de some pour s'arrêter dès qu'un employé correspondant est trouvé
           matchesCollaborator = collaborateursForMission.some((collab: any) => {
            if (collab && collab.mission && Array.isArray(collab.mission.employes)) {
              return collab.mission.employes.some((emp: any) => {
                const isMatch = String(emp.idE) === String(this.selectedCollaborator);
                console.log(`Mission ${mission.idM} - Comparaison: ${emp.idE} === ${this.selectedCollaborator} -> ${isMatch}`);
                return isMatch;
              });
            }
            return false;
          });
        } else {
          matchesCollaborator = false;
        }
      } else if (!this.selectedCollaborator) {
        matchesCollaborator = true;
      }

      // Filtre par compétences
      let matchesSkill = true;

      if(this.selectedSkill) {

        const competencesForMission: any = this.allInfoMissions.competences[mission.idM];
        console.log(`Compétences pour la mission ${mission.idM} :`, competencesForMission);

        if (Array.isArray(competencesForMission) && competencesForMission.length > 0) {
          // Utilisation de some pour s'arrêter dès qu'une compétence correspondant est trouvé
          matchesSkill = competencesForMission.some((skill: any) => {
            if (skill && skill.competences && Array.isArray(skill.competences)) {
              return skill.competences.some((cmp: any) => {
                const isMatch = cmp.idC === this.selectedSkill;
                console.log(`Mission ${mission.idM} - Comparaison: ${cmp.idC} === ${this.selectedSkill} -> ${isMatch}`);
                return isMatch;
              });
            }
            return false;
          });
        } else {
          matchesSkill = false;
        }
      } else if (!this.selectedSkill) {
        matchesSkill = true;
      }

      console.log(`Mission ${mission.idM} - matchesCollaborator :`, matchesCollaborator);
  
      // Retourne la mission uniquement si tous les filtres sont validés
      return matchesTitle && matchesDate && matchesPriority && matchesCollaborator && matchesSkill;
    });
    console.log("Missions filtrées :", this.filteredMissions);
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