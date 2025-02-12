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

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit() {
    this.loadCollaborateurs();
  }

  loadCollaborateurs() {
    this.collaborateurService.getEmployes().subscribe({
      next: (data) => this.collaborateurs = data,
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  selectCollaborateur(idE: number) {
    this.selectedCollaborateurId = idE;
  }
  onUpdate() {
    this.loadCollaborateurs(); // Rafraîchir la liste après mise à jour
    
}
}