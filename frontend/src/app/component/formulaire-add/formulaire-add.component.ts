import { Component } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvoirService } from 'src/app/services/avoir.service';
@Component({
  selector: 'app-formulaire-add',
  imports: [ReactiveFormsModule],
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
    private avoirService: AvoirService,
    public router: Router
  ) {
    this.employeForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      dateEmbauche: ['', Validators.required]
    });
  }



  

  lierCompetences(idE: number) {
    if (this.selectedCompetences.length === 0) {
      alert("Aucune compétence sélectionnée !");
      return;
    }

    this.selectedCompetences.forEach(idC => {
      this.avoirService.linkEmployeCompetences(idE, idC).subscribe({
        next: () => console.log(`Compétence ${idC} liée à l'employé ${idE}`),
        error: err => console.error("Erreur de liaison", err)
      });
    });
  }

  submitEmploye(): void {
    if (this.employeForm.valid) {
      const formData = this.employeForm.value;
      
      // Validation de la date
      if (isNaN(new Date(formData.dateEmbauche).getTime())) {
        alert('Date invalide');
        return;
      }
  
      const employeData = {
        ...formData,
        competences: this.selectedCompetences
      };
  
      this.collaborateurService.addEmployes(employeData).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => console.error('Erreur complète:', error)
      });
    }
  }
}