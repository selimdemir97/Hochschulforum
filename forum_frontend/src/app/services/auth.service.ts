import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  
  //ändert den login Status jenachdem ob der User eingeloggt ist. In der Navbar Komponente wird diese Variable aufgegriffen, sodass
  //wenn der User eingeloggt ist, es die HTML Komponente der Users beeinflusst.
  constructor(private Token:TokenService) { }
  changeAuthStatus(value : boolean){
    this.loggedIn.next(value);
  }
}
