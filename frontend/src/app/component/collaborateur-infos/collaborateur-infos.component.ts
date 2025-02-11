import { Component,Input } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
@Component({
  selector: 'app-collaborateur-infos',
  imports: [],
  templateUrl: './collaborateur-infos.component.html',
  styleUrl: './collaborateur-infos.component.scss',
  standalone: true
})
export class CollaborateurInfosComponent {
  @Input() idE!: 1; // ID de l'employé passé en entrée
  collaborateur: any; // Les données de l'employé récupérées
  constructor(private collaborateurService: CollaborateurService) {}
  ngOnInit(): void {
    if (this.idE) {
      this.collaborateurService.getEmployeWithId(this.idE).subscribe(
        (data) => {
          this.collaborateur = data; // Assignez les données récupérées
        },
        (error) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    } else {
      console.error('Aucun ID employé fourni');
    }
  }
}
