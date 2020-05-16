import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { User } from "./user.model";
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};



@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  apiURL = 'http://localhost';
  user:User;
  loggedInUser: User;

  constructor(private http: HttpClient,
    private router: Router,
    private tokenService: TokenService) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/users?token=' + this.tokenService.get());
  }

  updateUser(user: User):Observable<User>{
    return this.http.post<User>(this.apiURL+'/api/updateUser',user, httpOptions);
  }
  updatePassword(user: User):Observable<User>{
    return this.http.post<User>(this.apiURL+'/api/updatePassword',user, httpOptions);
  }

  findAll(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost/home');
  }
  
  addUser(user: User):Observable<User>{
    return this.http.post<User>(this.apiURL+'/api/signup',user, httpOptions);
  }
  loginUser(user: User):Observable<User>{
    return this.http.post<User>(this.apiURL+'/api/login',user, httpOptions);
  }
  getProfile(user: User): Observable<User>{
    return this.http.post<User>('http://localhost/api/me',user, httpOptions);
  }
  getById(id: number): Observable<User>{
    return this.http.post<User>('http://localhost/api/getId',id, httpOptions);
  }
}
