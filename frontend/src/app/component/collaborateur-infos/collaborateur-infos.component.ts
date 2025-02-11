import { Component } from '@angular/core';

@Component({
  selector: 'app-collaborateur-infos',
  imports: [],
  templateUrl: './collaborateur-infos.component.html',
  styleUrl: './collaborateur-infos.component.scss'
})
export class CollaborateurInfosComponent {
  collaborateur = {
    nom: 'Hamid FANIDO',
    dateEmbauche: '21 / 06 / 2010',
    statut: 'Actif'
  };
}