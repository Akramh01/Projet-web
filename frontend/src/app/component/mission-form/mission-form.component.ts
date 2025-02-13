import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private missionFormService: MissionFormService,
    private competenceFormNewMissionService: CompetenceFormNewMissionService,
    private missionsService: MissionsService,
    private requerirService: RequerirService,
  ) {
    this.missionForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      priorite: ['basse', Validators.required],
      competences: this.fb.array([]),
      collaborators: ['']
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

  onCompetenceChange(event: Event) {
    // recuperer l'element selectionné
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    // recuperer le texte de l'element selectionné
    const compName = selectedOption.text;
    const competence = this.competences.find((c) => c.nom_fr === compName);
    const compId = competence.idC;
    console.log('IdC :', compId);
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