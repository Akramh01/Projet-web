import { Component } from '@angular/core';
import { AddCComponent } from '../add-c/add-c.component';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formulaire-add',
  imports: [AddCComponent,ReactiveFormsModule],
  templateUrl: './formulaire-add.component.html',
  styleUrl: './formulaire-add.component.scss',
  standalone: true
})
export class FormulaireAddComponent {
  
  
  employeForm: FormGroup;
  selectedCompetences: number[] = [];

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

  onCompetencesSelected(competences: number[]) {
    this.selectedCompetences = competences;
  }

  submitEmploye(): void {
    if (this.employeForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
  
    const employeData = {
      ...this.employeForm.value,
     
    };
  
    this.collaborateurService.addEmployes(employeData).subscribe({
      next: () => {
        alert('Employé ajouté avec succès !');
        this.employeForm.reset();
        this.selectedCompetences = [];
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout:', error);
        alert('Erreur lors de l\'ajout de l\'employé');
      }
    });
  }
}