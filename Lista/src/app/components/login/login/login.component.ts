import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public mensajeError: string = '';
  constructor(public authService: AuthService) {
    this.mensajeError = '';
  }

  ngOnInit(): void {
  }

  login(u:string,p:string): boolean {
    this.mensajeError = '';
    if (!this.authService.login(u, p)) {
      this.mensajeError = 'Login incorrecto';
      setInterval(()=>{
        this.mensajeError = '';
      }, 2500,[]);
      
    }
    return false;
  }
  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
