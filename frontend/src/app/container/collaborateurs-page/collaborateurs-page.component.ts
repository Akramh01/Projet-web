import { Component, OnInit } from '@angular/core';
import { CollaborateurListComponent } from 'src/app/component/collaborateur-list/collaborateur-list.component';
import { CollaborateurService } from '../../services/collaborateur.service';

@Component({
  selector: 'app-collaborateurs-page',
  imports: [CollaborateurListComponent],
  templateUrl: './collaborateurs-page.component.html',
  styleUrl: './collaborateurs-page.component.scss',
  standalone: true
})
export class CollaborateursComponent implements OnInit {
  collaborateurs: any[] = [];
  showDeletePopup: boolean = false;
  selectedCollaborateur: any = null;

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.loadCollaborateurs();
  }

  loadCollaborateurs(): void {
    this.collaborateurService.getEmployes().subscribe((data) => {
      this.collaborateurs = data;
    });
  }

  openDeletePopup(collaborateur: any): void {
    this.selectedCollaborateur = collaborateur;
    this.showDeletePopup = true;
  }

  onClosePopup(): void {
    this.showDeletePopup = false; // Fermer le pop-up
  }
}