import { Component, EventEmitter, Output } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvoirService } from 'src/app/services/avoir.service';

@Component({
  selector: 'app-ajouter-collaborateur',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './ajouter-collaborateur.component.html',
  styleUrl: './ajouter-collaborateur.component.scss'
})

export class AjouterCollaborateurComponent {

  @Output() close = new EventEmitter<void>(); // Événement pour fermer le popup
  @Output() collaborateurAdded = new EventEmitter<void>();
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



  onCompetencesSelected(competences: number[]) {
    this.selectedCompetences = competences;
    console.log("Compétences sélectionnées :", this.selectedCompetences);
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
        next: () => {
          this.close.emit();
          this.collaborateurAdded.emit();
          alert('Employé ajouté avec succès !');
        },
        error: (error) => console.error('Erreur complète:', error)
      });
    }
  }
  
  closeModal(): void {
    this.close.emit(); // Fermer le popup
  }
}