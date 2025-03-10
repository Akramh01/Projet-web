import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionFormService {
  private isFormOpen = new BehaviorSubject<boolean>(false);
  private isEditFormOpen = new BehaviorSubject<boolean>(false);
  private isDetailFormOpen = new BehaviorSubject<boolean>(false);


  getFormStatus() {
    return this.isFormOpen.asObservable();
  }

  openForm() {
    this.isFormOpen.next(true);
  }

  closeForm() {
    this.isFormOpen.next(false);
  }

  openEditForm() {
    this.isEditFormOpen.next(true);
  }

  openDetailForm() {
    this.isDetailFormOpen.next(true);
  }

}
