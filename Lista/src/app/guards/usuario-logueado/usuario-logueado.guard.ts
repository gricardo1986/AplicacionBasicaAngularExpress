import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(/*route: ActivatedRouteSnapshot*/ next:ActivatedRouteSnapshot, state: RouterStateSnapshot)
    :Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = this.authService.isLoggedIn();
      console.log('canActivate', this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
  }
  
}
