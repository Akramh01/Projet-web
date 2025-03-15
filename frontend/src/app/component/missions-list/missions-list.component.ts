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
  @Input() selectedCollaborator?: string ='';

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
      this.allInfoMissions.missions = this.allMissions;
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
          this.allInfoMissions.collaborateurs = this.allCollaborateurs;
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
      // Si aucun collaborateur n'est sélectionné, matchesCollaborator est true
      let matchesCollaborator = true;
  
      // Sinon, on vérifie uniquement les collaborateurs associés à la mission en cours
      if (this.selectedCollaborator) {
        // Récupère les collaborateurs pour la mission courante en utilisant mission.idM
        const collaborateursForMission: any = this.allInfoMissions.collaborateurs[mission.idM];
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
      console.log(`Mission ${mission.idM} - matchesCollaborator :`, matchesCollaborator);
  
      // Retourne la mission uniquement si tous les filtres sont validés
      return matchesTitle && matchesDate && matchesPriority && matchesCollaborator;
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


/*let matchesCollaborator = true;
      if (this.allInfoMissions && this.allInfoMissions.collaborateurs) {
        // Parcours de toutes les clés de l'objet collaborateurs (chaque clé correspond à l'id d'une mission)
        Object.keys(this.allInfoMissions.collaborateurs).forEach(missionId => {
          const collaborateursForMission: any = this.allInfoMissions.collaborateurs[missionId];
      
          if (Array.isArray(collaborateursForMission) && collaborateursForMission.length > 0) {
            console.log(`Collaborateurs pour la mission ${missionId} :`, collaborateursForMission);
      
            collaborateursForMission.forEach((collab: any) => {
              // Vérifie que la structure attendue est présente (collab.mission.employes)
              if (collab && collab['mission'] && collab['mission']['employes'] && Array.isArray(collab['mission']['employes'])) {
                const employes = collab['mission']['employes'];
                employes.forEach((emp: any, index: number) => {
                  console.log(`Mission ${missionId} - Employé ${index} - idE: ${emp['idE']}, nom: ${emp['nom']}, prenom: ${emp['prenom']}`);
                  matchesCollaborator = !this.selectedCollaborator || emp['idE'] === Number(this.selectedCollaborator);
                  console.log(`Comparaison des identifiants : ${emp['idE']} === ${this.selectedCollaborator} -> ${matchesCollaborator}`);
                });
              } else {
                console.log(`Structure inattendue pour la mission ${missionId} :`, collab);
              }
            });
          } else {
            console.log(`Aucun collaborateur trouvé pour la mission ${missionId}.`);
          }
        });
      } else {
        console.log("La propriété 'collaborateurs' n'est pas définie dans allInfoMissions.");
      }*/

        // Filtre par collaborateur
      /*const collaborateurs = this.allInfoMissions.collaborateurs[mission.idM] || [];
      console.log(`Collaborateurs pour la mission ${mission.idM} :`, collaborateurs);
      const matchesCollaborator = !this.selectedCollaborator || (Array.isArray(collaborateurs) && collaborateurs.some(collab => {
        const isMatch = collab.idE === this.selectedCollaborator;
        console.log(`Comparaison des identifiants : ${collab.idE} === ${this.selectedCollaborator} -> ${isMatch}`);
        return isMatch;
      }));*/