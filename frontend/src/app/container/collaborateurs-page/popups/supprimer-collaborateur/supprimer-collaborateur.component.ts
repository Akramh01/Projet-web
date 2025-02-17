import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service'; 

@Component({
  selector: 'app-supprimer-collaborateur',
  imports: [],
  templateUrl: './supprimer-collaborateur.component.html',
  styleUrl: './supprimer-collaborateur.component.scss'
})
export class SupprimerCollaborateurComponent {
  constructor(private collaborateurService: CollaborateurService){}

  @Input() collaborateur: any;
  @Input() isVisible: boolean = false; // Reçoit l'état de visibilité du parent
  @Output() confirmDelete = new EventEmitter<void>(); // Émet un événement pour confirmer la suppression
  @Output() cancelDelete = new EventEmitter<void>(); // Émet un événement pour annuler la suppression

    ngOnInit(): void {
      
    }
    closePopup() {
      this.isVisible = false; // Masquer le pop-up
    }
  
    // Méthode pour confirmer la suppression
  onConfirmDelete(): void {
    this.confirmDelete.emit();
  }

  // Méthode pour annuler la suppression
  onCancelDelete(): void {
    this.cancelDelete.emit();
  }
  
    // Méthode pour supprimer un employé
    deleteEmploye(): void {
      this.collaborateurService.deleteEmploye(this.collaborateur.idE).subscribe(
        () => {
          alert('Employé supprimé avec succès !');
          this.closePopup(); 
          this.confirmDelete.emit(); 
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'employé :', error);
          alert('Erreur lors de la suppression de l\'employé.');
        }
      );
    }
}

