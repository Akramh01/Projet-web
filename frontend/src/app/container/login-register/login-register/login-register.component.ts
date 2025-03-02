import { Component, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss', 
})
export class LoginRegisterComponent {
  @ViewChild('container', { static: false }) container!: ElementRef;


  onRegisterClick(): void {
    console.log('Register button clicked');
    console.log(this.container); // Vérifiez que this.container est défini
    this.container.nativeElement.classList.add('right-panel-active');
  }
  
  onLoginClick(): void {
    console.log('Login button clicked');
    console.log(this.container); // Vérifiez que this.container est défini
    this.container.nativeElement.classList.remove('right-panel-active');
  }
}
