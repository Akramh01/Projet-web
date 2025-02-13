import { Component, Input } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-infos-collaborateur',
  imports: [],
  templateUrl: './infos-collaborateur.component.html',
  styleUrl: './infos-collaborateur.component.scss'
})
export class InfosCollaborateurComponent {
  collaborateurs: any[] = [];
  selectedCollaborateurId?: number;
  @Input() idE!: number; // Add this input property
  selectedCollaborateur: any; // Add this property to hold the selected collaborator

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit() {
    this.loadCollaborateurs(this.idE);
  }

  loadCollaborateurs(idE: number) {
    this.collaborateurService.getEmployeWithId(idE).subscribe({
      next: (data) => this.selectedCollaborateur = data,
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  selectCollaborateur(idE: number) {
    this.selectedCollaborateurId = idE;
  }
  onUpdate() {
    this.loadCollaborateurs(this.idE); // Rafraîchir la liste après mise à jour
    
}
}
