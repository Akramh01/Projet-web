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
  collaborateurs: any[] = [];
  selectedCollaborateurId?: number;
  @Input() idE!: number;  // Récupère l'ID de l'employé depuis le parent
  collaborateur: any;
  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit() {
    if (this.idE) {
      this.collaborateurService.getEmployeWithId(this.idE).subscribe({
        next: (data) => this.collaborateur = data,
        error: (err) => console.error('Erreur lors de la récupération du collaborateur', err)
      });
    }
  }

  selectCollaborateur(idE: number) {
    this.selectedCollaborateurId = idE;
  }
 
}