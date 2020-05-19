import { Component, OnInit, ErrorHandler } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users: User[];
  user:User;
  email:string;
  name: string;
  password:string;
  password_confirmation:string;
  public error=null;
  

  constructor(private userService: UserService, 
    private Token: TokenService,
    private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    this.user={
      name: this.name,
      password: this.password,
      email: this.email,
      password_confirmation:this.password_confirmation,
    }
    this.userService.addUser(this.user).subscribe(
        data=>this.handleResponse(data),
        error => this.handle(error)
      );
  }
  handle(error){//Diese Methode ist für die errorinitialisierung damit sie in der html komponente verwendet werden kann.
   this.error=error.error.errors;     
  }
  handleResponse(data){//Diese Methode registriert einen User durch ein Token und speichert zur Identifikation die Email.
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }
}
