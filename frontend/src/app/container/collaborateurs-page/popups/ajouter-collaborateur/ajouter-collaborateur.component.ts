import { Component } from '@angular/core';
import { AjouterFormulaireComponent } from './ajouter-formulaire/ajouter-formulaire.component';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-collaborateur',
  standalone: true,
  imports: [AjouterFormulaireComponent, ReactiveFormsModule],
  templateUrl: './ajouter-collaborateur.component.html',
  styleUrl: './ajouter-collaborateur.component.scss',
})

export class AjouterCollaborateurComponent {

  employeForm: FormGroup;
  selectedCompetences: string[] = [];

  constructor(
    private fb: FormBuilder,
    private collaborateurService: CollaborateurService,
    public router: Router
  ) {
    this.employeForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      dateEmbauche: ['', Validators.required]
    });
  }

  onCompetencesSelected(competences: string[]) {
    this.selectedCompetences = competences;
  }

  submitEmploye(): void {
    if (this.employeForm.valid) {
      const employeData = this.employeForm.value;
      console.log('Données du formulaire:', employeData);
  
      this.collaborateurService.addEmployes(employeData).subscribe({
        next: (response) => {
          console.log('Succès:', response);
          // ... reste du code
        },
        error: (error) => {
          console.error('Erreur détaillée:', error);
          // Afficher plus de détails sur l'erreur
          alert(`Erreur lors de l'ajout: ${error.message}`);
        }
      });
    }
  }

}


