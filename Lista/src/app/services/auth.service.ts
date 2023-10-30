import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(user:string, pass:string): boolean {
    if (user == 'user' && pass == 'pass') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }
  logout(): void {
    localStorage.removeItem('username');
  }
  getUser(): any {
    return localStorage.getItem('username');
  }
  isLoggedIn(): boolean {
    return this.getUser() !== null && this.getUser() !== '';
  }
}
