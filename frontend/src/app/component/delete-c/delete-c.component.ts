import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-delete-c',
  templateUrl: './delete-c.component.html',
  styleUrls: ['./delete-c.component.scss'],  // Corrigez le nom du fichier ici, vous avez écrit styleUrl
})
export class DeleteCComponent {
  constructor(private collaborateurService: CollaborateurService, private router: Router) {}

  @Input() collaborateur: any;
  @Output() close = new EventEmitter<void>(); // Ajout de l'Output
  ngOnInit(): void {}

  closePopup() {
    this.close.emit(); // Émet un événement pour signaler la fermeture de la popup
  }


  // Méthode pour supprimer un employé
  deleteEmploye(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.collaborateurService.deleteEmploye(this.collaborateur.idE).subscribe(
        () => {
          alert('Employé supprimé avec succès !');
          // Rediriger vers la page des collaborateurs après la suppression
          this.router.navigate(['/collaborateurs-page']);
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'employé :', error);
          alert('Erreur lors de la suppression de l\'employé.');
        }
      );
    }
  }
}
