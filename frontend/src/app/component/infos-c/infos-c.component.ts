import { Component } from '@angular/core';
import { CollaborateurInfosComponent } from 'src/app/component/collaborateur-infos/collaborateur-infos.component';
import { CollaboateurCompeComponent } from 'src/app/component/collaboateur-compe/collaboateur-compe.component';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
@Component({
  selector: 'app-infos-c',
  imports: [CollaborateurInfosComponent,CollaboateurCompeComponent],
  templateUrl: './infos-c.component.html',
  styleUrl: './infos-c.component.scss'
})
export class InfosCComponent {
  collaborateurId: number = 1;
 selectedCollaborateur = {}; 

 
}
