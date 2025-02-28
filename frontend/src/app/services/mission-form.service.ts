import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionFormService {
  private isFormOpen = new BehaviorSubject<boolean>(false);
  private isEditFormOpen = new BehaviorSubject<boolean>(false);

  // Observable pour surveiller l'état du formulaire
  getFormStatus() {
    return this.isFormOpen.asObservable();
  }

  // Méthode pour ouvrir le formulaire
  openForm() {
    this.isFormOpen.next(true);
  }


  // Méthode pour fermer le formulaire
  closeForm() {
    this.isFormOpen.next(false);
  }

  //methode pour ouvrir le formulaire d'édition

  openEditForm() {
    this.isEditFormOpen.next(true);
  }

}
