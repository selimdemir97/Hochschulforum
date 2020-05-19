import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userU:User={
    email:undefined
  };
  userP:User={
    email:undefined
  };;
  error:string;
  name:string;
  email:string;
  password:string;
  password_old:string;
  password_new:string;
  password_new_confirmation:string;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    
  }
  updateUser(){//Diese Funktion ist für das Editieren des Benutzers verantwortlich
    this.userService.getCurrentUser().subscribe(data=>{
    this.userU={
      name:this.name,
      email:this.email,
      password:this.password,
      email_old:data.email
    }
    this.userService.updateUser(this.userU).subscribe(
      data=>{
        if(data.toString()=="1"){
          this.router.navigateByUrl('/dashboard');
        }else{
          console.log(data)
          this.error=data.toString()
        }
      
      
    });
  });
  }
  updatePassword(){//Diese Funktion ist für das Editieren des Passworts verantwortlich
    this.userService.getCurrentUser().subscribe(data=>{
      console.log(data);
      console.log(data.email);  
    this.userP={
      password:this.password_old,
      password_new:this.password_new,
      password_new_confirmation:this.password_new_confirmation,
      email:data.email
    }
    this.userService.updatePassword(this.userP).subscribe(
      data=>{
      console.log(data)
    });
  });
  }

}
