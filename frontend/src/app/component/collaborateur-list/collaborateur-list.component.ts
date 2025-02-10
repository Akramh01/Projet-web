import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from '../../services/collaborateur.service';
import { CollaborateurCardComponent } from '../collaborateur-card/collaborateur-card.component'; 


@Component({
  selector: 'app-collaborateur-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.scss'],
  standalone: true,
  imports: [CollaborateurCardComponent]
})
export class CollaborateurListComponent implements OnInit {
  collaborateurs: any[] = [];

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.collaborateurService.getEmployes().subscribe(data => {
      this.collaborateurs = data;
    });
  }
}
