import { Component,Input } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-delete-c',
  imports: [ ],
  templateUrl: './delete-c.component.html',
  styleUrl: './delete-c.component.scss',
  standalone: true,
})
export class DeleteCComponent {
  constructor(private collaborateurService: CollaborateurService,private router: Router){}

@Input() collaborateur: any;

  ngOnInit(): void {
    
  }
  closePopup() {
    // Naviguer vers la page des collaborateurs avec le router
    this.router.navigate(['/collaborateurs-page']);  // Utilisez le bon chemin de route
  }


  // Méthode pour supprimer un employé
 deleteEmploye(): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
    this.collaborateurService.deleteEmploye(this.collaborateur.idE).subscribe(
      () => {
        alert('Employé supprimé avec succès !');
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'employé :', error);
        alert('Erreur lors de la suppression de l\'employé.');
      }
    );
  }
}
}
