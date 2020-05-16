import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {
  //Diese Funktion ist für das Routing wichtig, da alle Komponenten je nach dem ob der User eingeloggt ist oder nicht auf diese Methode reagieren
  //detailierte Erklärung im app-routing.module 
  canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | 
  Observable<boolean> | Promise<boolean>{
    return !this.Token.loggedIn();
  }
  constructor(private Token: TokenService) { }

}
