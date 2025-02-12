import { Component, EventEmitter, Output, OnInit } from '@angular/core'; // Ajoutez OnInit
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MissionFormService } from 'src/app/services/mission-form.service';
import { CompetenceFormNewMissionService } from 'src/app/services/competence-form-new-mission.service'; // Import du service
import { MissionsService, Mission } from '../../services/missions.service';
import { RequerirService } from 'src/app/services/requerir.service';

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
    private missionsService: MissionsService,
    private requerirService: RequerirService
  ) {
    this.missionForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      priorite: ['basse', Validators.required],
      competences: [[]],
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
          console.log(this.competences);
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
            const missionData = {
              idM: response.idM, // Utilisez l'ID de la mission créée
              idC: newMission.idC, // Assurez-vous que cette valeur est correcte
            };
    
            console.log('Données à envoyer à linkMissionCompetence :', missionData); // Ajoutez ce log pour vérifier les données
    
            this.requerirService.linkMissionCompetence(missionData).subscribe(
              (response: any) => {
                console.log('Données envoyées :', missionData);
                console.log('Compétence liée avec succès :', response);
                this.formSubmit.emit(response); // Émettre l'événement avec la réponse
                this.missionFormService.closeForm(); // Fermer le formulaire
              },
              (error: any) => {
                console.error('Erreur lors de la liaison de la compétence :', error);
              }
            );
          },
          (error: any) => {
            console.error('Erreur lors de la création de la mission :', error);
          }
        );
      }
    }


}


