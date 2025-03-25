import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';


@Component({
  selector: 'app-collaborateur-recommed-detail',
  imports: [],
  templateUrl: './collaborateur-recommed-detail.component.html',
  styleUrl: './collaborateur-recommed-detail.component.scss'
})
export class CollaborateurRecommedDetailComponent  implements OnInit {
  @Input() idE: number | null = null; 
  @Output() close = new EventEmitter<void>();
  collaborateur: any = null;


  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    if (this.idE !== null) {
      this.loadCollaborateurDetails(this.idE);
    }
  }

  loadCollaborateurDetails(idE: number): void {
    this.collaborateurService.getEmployeWithId(idE).subscribe(
      (data) => {
        this.collaborateur = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du collaborateur :', error);
      }
    );
  }


  closePopup() {
    this.close.emit();
  }


}
