import { Component, EventEmitter, Output, OnInit } from '@angular/core'; // Ajoutez OnInit
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MissionFormService } from 'src/app/services/mission-form.service';
import { CompetenceFormNewMissionService } from 'src/app/services/competence-form-new-mission.service'; // Import du service
import { MissionsService, Mission } from '../../services/missions.service';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  providers: [MissionsService],
})
export class MissionFormComponent implements OnInit { // Implémentez OnInit
  @Output() formSubmit = new EventEmitter<any>();
  isOpen = false;
  competences: any[] = []; // Stocker les compétences récupérées

  missionForm: FormGroup;
  // missionsService: any;

  constructor(
    private fb: FormBuilder,
    private missionFormService: MissionFormService,
    private competenceFormNewMissionService: CompetenceFormNewMissionService,
    private missionsService: MissionsService, // Injection du service
  ) {
    this.missionForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      priorite: ['basse', Validators.required],
      skills: [[]],
      collaborators: ['']
    });

    // Abonnement à l'état du formulaire (ouvert/fermé)
    this.missionFormService.getFormStatus().subscribe((status) => {
      this.isOpen = status;
    });
  }

  ngOnInit() {
    this.loadCompetences();
  }

  // Méthode pour charger les compétences depuis le backend
  loadCompetences() {
    this.competenceFormNewMissionService.getCompetences().subscribe(
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
        },
        (error: any) => {
          console.error('Erreur lors de la création de la mission :', error);
        }
      );
    }
  }

  // onSubmit() {
  //   if (this.missionForm.valid) {

      
  //     const selectedSkills = this.missionForm.value.skills; // Récupérer les compétences sélectionnées
  //     console.log('Compétences sélectionnées :', selectedSkills);

  //     // Envoyer les données du formulaire au backend
  //     this.formSubmit.emit(this.missionForm.value);
  //     this.missionFormService.closeForm();
  //   }
  // }
}


