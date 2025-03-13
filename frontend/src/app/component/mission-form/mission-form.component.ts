import { Component, EventEmitter, Output, OnInit, Input, SimpleChanges, OnChanges, Signal, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MissionFormService } from 'src/app/services/mission-form.service';
import { MissionsService, Mission } from '../../services/missions.service';
import { RequerirService } from 'src/app/services/requerir.service';
import { CompetenceService } from 'src/app/services/competences.service';

export type Mode = 'CREATION' | 'MODIFICATION' | 'CONSULTATION';


@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  providers: [MissionsService]
})

export class MissionFormComponent implements OnInit { 
  @Output() formSubmit = new EventEmitter<any>();
  //@Input() mission: any;
  selectedMission = signal<Mission | null>(null); // Signal pour la mission sélectionnée
  isOpen = false;
  competences: any[] = []; // Stocker les compétences récupérées

  missionForm: FormGroup;
  
  selectedCompetences: any[] = [];

  private _mission = signal<any>(null);

  // Exposez le Signal via une propriété getter
  @Input() set mission(value: any) {
    this._mission.set(value); // Mettez à jour le Signal lorsque la mission change
  }
  get mission(): any {
    return this._mission(); // Obtenez la valeur actuelle du Signal
  }

  // Utilisez un Signal pour le mode (optionnel)
  private _mode = signal<Mode>('CREATION');
  @Input() set mode(value: Mode) {
    this._mode.set(value); // Mettez à jour le Signal lorsque le mode change
  }
  get mode(): Mode {
    return this._mode(); // Obtenez la valeur actuelle du Signal
  }

  constructor(
    private fb: FormBuilder,
    private missionFormService: MissionFormService,
    private missionsService: MissionsService,
    private requerirService: RequerirService,
    private competencesService: CompetenceService, // Injectez le service
  ) {
    this.missionForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      priorite: ['basse', Validators.required],
      competences: this.fb.array([]),
      collaborateurs: []
    });

    // Abonnement à l'état du formulaire (ouvert/fermé)
    this.missionFormService.getFormStatus().subscribe((status) => {
      this.isOpen = status;
    });

    effect(() => {
      const mission = this.selectedMission();
      const mode = this._mode();

      if (mode === 'MODIFICATION' && mission) {
        this.prefillForm(mission); // Préremplir le formulaire
      } else if (mode === 'CREATION') {
        this.missionForm.reset(); // Réinitialiser le formulaire
        this.selectedCompetences = []; // Réinitialiser les compétences sélectionnées
      }
    });
   
  
  }

  ngOnInit() {
    // Charger les compétences disponibles
    this.loadCompetences();

  
  }

  // Méthode pour préremplir le formulaire avec les données de la mission
  prefillForm(mission: any) {
    console.log(mission);
    
    this.missionForm.patchValue({
      titre: mission.titre,
      description: mission.description,
      date_debut: mission.date_debut,
      date_fin: mission.date_fin,
      priorite: mission.priorite,
      competences: mission.competences, // Assurez-vous que c'est un tableau d'IDs
    });

    // Préremplir les compétences sélectionnées
    if (mission.competences) {
      this.selectedCompetences = this.competences.filter((c) =>
        mission.competences.includes(c.id)
      );
    }
  }

  // Méthode pour charger les compétences depuis le backend
  loadCompetences() {
    this.competencesService.getCompetencesForm().subscribe(
      (data) => {
        this.competences = data; // Stocker les compétences récupérées
      },
      (error) => {
        console.error('Erreur lors du chargement des compétences :', error);
      }
    );
  }

  closeForm() {
    this.missionFormService.closeForm(); // Ajoutez les parenthèses
  }

  // Méthode pour supprimer une compétence sélectionnée
  removeCompetence(competence: any) {
    this.selectedCompetences = this.selectedCompetences.filter((c) => c.id !== competence.id); // Supprimer de la liste
  
  }

  onCompetenceChange(event: Event) {
    // recuperer l'element selectionné
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    // recuperer le texte de l'element selectionné
    const compName = selectedOption.text;
    const competence = this.competences.find((c) => c.nom_fr === compName);
    const compId = competence.idC;
    // Ajouter la compétence à la liste des compétences
    (this.missionForm.get('competences') as FormArray).push(this.fb.group({ idC: compId }));

    if (competence && !this.selectedCompetences.includes(competence)) {
      this.selectedCompetences.push(competence); // Ajouter à la liste des compétences sélectionnées
    }
  }

  onSubmit() {
    if (this.missionForm.valid) {
      const newMission = this.missionForm.value; // Récupérer les données du formulaire
      console.log('Données du formulaire :', newMission);

      // Envoyer les données au backend via le service
      this.missionsService.addMission(newMission).subscribe(
        (response: any) => {
          console.log('Mission créée avec succès :', response);
          this.formSubmit.emit(response); // Émettre l'événement avec la réponse
          this.missionFormService.closeForm(); // Fermer le formulaire

          // Assurez-vous que newMission contient les valeurs idM et idC
          const missionId = response.idM; // Utilisez l'ID de la mission créée
          const competences = newMission.competences; // Liste des compétences

          console.log('Liste des compétences :', competences); // Ajoutez ce log pour vérifier les compétences

          competences.forEach((competence: any) => {
            if (!competence.idC) {
              console.error('Compétence sans idC :', competence); // Ajoutez ce log pour vérifier les compétences sans idC
              return;
            }

            const missionData = {
              idM: missionId,
              idC: competence.idC
            };

            console.log('Données à envoyer à linkMissionCompetence :', missionData); // Ajoutez ce log pour vérifier les données

            this.requerirService.linkMissionCompetence(missionData).subscribe(
              (response: any) => {
                console.log('Données envoyées :', missionData);
                console.log('Compétence liée avec succès :', response);
              },
              (error: any) => {
                console.error('Erreur lors de la liaison de la compétence :', error);
              }
            );
          });
        },
        (error: any) => {
          console.error('Erreur lors de la création de la mission :', error);
        }
      );
    }
  }
}