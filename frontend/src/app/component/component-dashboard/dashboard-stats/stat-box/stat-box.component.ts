import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-box',
  imports: [],
  templateUrl: './stat-box.component.html',
  styleUrl: './stat-box.component.scss'
})
export class StatBoxComponent {
  @Input() value: string | number = '';
  @Input() title: string = '';
  @Input() icon: string = ''; 
}
