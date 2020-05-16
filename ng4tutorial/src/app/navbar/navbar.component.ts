import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { DataService } from '../services/data.service';
import { PostsService } from '../posts/posts.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  name:String=new String("");
  users:User[];
  user: User = {
    email: undefined
  }
  
  

  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token:TokenService,
    private userService:UserService,
    private postService: PostsService,
  ) { 
  }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value=>this.loggedIn=value);
    this.userService.getCurrentUser().subscribe(data=>{
      this.user.name=data.name,
      this.user.id=data.id
      this.postService.getUsers().subscribe(users => {
        this.users=users;
      });
    });
    
  }

  search(){//Diese Methode ist für die Namenssuche verantwortlich
    if(this.name!=""){
      this.users=this.users.filter(res=>{
        return res.name.toLowerCase().match(this.name.toLowerCase());
      });
    }else if(this.name==""){
      this.ngOnInit();
    }
  }

  logout(event: MouseEvent){//Diese Methode meldet den Benutzer ab.
    event.preventDefault();
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
  viewUser(event: MouseEvent){//Diese Methode geht auf das Profil des Users.
    event.preventDefault();
    
    this.router.navigateByUrl('/profile');
  }

}
