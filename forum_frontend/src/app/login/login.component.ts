import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[];
  user:User;
  email:string;
  password:string;
  public error=null;
  
  constructor(private userService: UserService,
    private Token: TokenService,
    private router : Router,
    private Auth: AuthService,
    private service: DataService) { }

  ngOnInit() {
  }
 
  onSubmit(){
    this.user={
      password: this.password,
      email: this.email,
    }
    this.userService.loginUser(this.user).subscribe(
      data => this.handleResponse(data), 
      error => this.error=error.error.error
      );
  }
  handleResponse(data){//Diese Methode Loggt einen User durch Tokenhandling ein und speichert zur Identifikation die Email des Users.
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.service.senddata(this.user);
    this.router.navigateByUrl('/dashboard');
  }
  
}
