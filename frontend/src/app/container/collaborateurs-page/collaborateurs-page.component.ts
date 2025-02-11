import { Component } from '@angular/core';
import { CollaborateurListComponent } from 'src/app/component/collaborateur-list/collaborateur-list.component';

@Component({
  selector: 'app-collaborateurs',
  imports: [CollaborateurListComponent],
  templateUrl: './collaborateurs-page.component.html',
  styleUrl: './collaborateurs-page.component.scss'
})
export class CollaborateursComponent {

}
