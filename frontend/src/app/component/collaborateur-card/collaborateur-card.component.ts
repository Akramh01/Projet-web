// import { Component, EventEmitter, Input, Output  } from '@angular/core';
// import { Collaborateur } from 'src/app/services/collaborateur.service';

// @Component({
//   selector: 'app-collaborateur-card',
//   imports: [],
//   templateUrl: './collaborateur-card.component.html',
//   styleUrl: './collaborateur-card.component.scss',
//   standalone: true,
// })
// export class CollaborateurCardComponent {
//   @Input() employe!: Collaborateur;
//     @Output() editCollaborateur = new EventEmitter<Collaborateur>();
//     edit() {
//       this.editCollaborateur.emit(this.employe);
//     }
// }

// import { Component, Input } from '@angular/core';

// @Component({
//     selector: 'app-collaborateur-card',
//     templateUrl: './collaborateur-card.component.html',
//     styleUrls: ['./collaborateur-card.component.css'],
// })
// export class CollaborateurCardComponent {
//     @Input() prenom!: string;
//     @Input() nom!: string;
//     @Input() statut!: string;
//     @Input() competences!: { idC: string; nom_fr: string }[];
// }

// collaborateur-card.component.ts
import { Component, Input } from '@angular/core';
import { CollaborateurService } from 'src/app/services/collaborateur.service';

@Component({
  selector: 'app-collaborateur-card',
  templateUrl: './collaborateur-card.component.html',
  styleUrls: ['./collaborateur-card.component.scss'],
  standalone: true
})
export class CollaborateurCardComponent {
  @Input() collaborateur: any;
  competences: any[] = [];

  constructor(private collaborateurService: CollaborateurService) {}

  ngOnInit(): void {
    this.collaborateurService.getEmployeWithId(this.collaborateur.idE).subscribe(data => {
      this.competences = data.competences;
    });
  }
}