  import { Component, EventEmitter, Output, OnInit, Input, SimpleChanges, OnChanges, Signal, effect, signal } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
  import { ReactiveFormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { MissionFormService } from 'src/app/services/mission-form.service';
  import { MissionsService, Mission } from '../../services/missions.service';
  import { RequerirService } from 'src/app/services/requerir.service';
  import { CompetenceService } from 'src/app/services/competences.service';



  @Component({
    selector: 'app-mission-form',
    templateUrl: './mission-form.component.html',
    styleUrls: ['./mission-form.component.scss'],
    imports: [ReactiveFormsModule, CommonModule],
    providers: [MissionsService]
  })

  export class MissionFormComponent implements OnInit { 
    @Output() formSubmit = new EventEmitter<any>();
    @Output() missionCreated = new EventEmitter<Mission>();
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

    removeCompetence(competence: any) {
      // Supprimer de la liste des compétences sélectionnées
      this.selectedCompetences = this.selectedCompetences.filter((c) => c.idC !== competence.idC);
      
      // Supprimer du FormArray des compétences
      const competencesFormArray = this.missionForm.get('competences') as FormArray;
      
      // Trouver l'index de la compétence à supprimer
      const indexToRemove = competencesFormArray.controls.findIndex(
        (control) => control.value.idC === competence.idC
      );
      
      // Si trouvé, supprimer du FormArray
      if (indexToRemove !== -1) {
        competencesFormArray.removeAt(indexToRemove);
      }
    }

    onCompetenceChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const compName = selectedOption.text;
      const competence = this.competences.find((c) => c.nom_fr === compName);
      
      if (!competence) return;
    
      const competencesFormArray = this.missionForm.get('competences') as FormArray;
      
      // Vérifier si la compétence existe déjà
      const existingCompetence = competencesFormArray.controls.some(
        (control) => control.value.idC === competence.idC
      );
      
      if (!existingCompetence) {
        // Ajouter au FormArray uniquement si pas déjà présente
        competencesFormArray.push(this.fb.group({ idC: competence.idC }));
        
        // Ajouter à selectedCompetences
        if (!this.selectedCompetences.includes(competence)) {
          this.selectedCompetences.push(competence);
        }
      }
      
      // Réinitialiser la sélection
      selectElement.selectedIndex = 0;
    }

    onSubmit() {
      if (this.missionForm.valid) {
        const newMission = this.missionForm.value; 
        console.log('Données du formulaire :', newMission);

        // Envoyer les données au backend via le service
        this.missionsService.addMission(newMission).subscribe(
          (response: any) => {
            console.log('Mission créée avec succès :', response);
            this.formSubmit.emit(response);
            this.missionFormService.closeForm(); 

           
            const missionId = response.idM; 
            const competences = newMission.competences; 

            console.log('Liste des compétences :', competences); 

            competences.forEach((competence: any) => {
              if (!competence.idC) {
                console.error('Compétence sans idC :', competence); 
                return;
              }

              const missionData = {
                idM: missionId,
                idC: competence.idC
              };

              console.log('Données à envoyer à linkMissionCompetence :', missionData); 

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
            this.missionCreated.emit(response); // Émettre l'événement avec la réponse
          },
          (error: any) => {
            console.error('Erreur lors de la création de la mission :', error);
          }
        );
      }
    }
  }