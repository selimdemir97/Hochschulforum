import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  $isLoggedIn= new EventEmitter();
  constructor() { }
  senddata(user: User){
    this.$isLoggedIn.emit(user.email);
  }
  
}
