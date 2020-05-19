import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';
import { PostsService } from '../posts/posts.service';
import { Restriction } from './restriction.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  class1:string;
  title:string;
  body:string;
  post:Post;
  users:User[];
  selected_users=new Array<User>();
  user: User = {
    email: undefined
  }
  public error=null;

  constructor(private userService: UserService,
    private router: Router,
    private postService: PostsService) { }

  ngOnInit() {
    this.class1="btn btn-primary";
    this.userService.getCurrentUser().subscribe(data=>{
      this.user.id=data.id
      this.postService.getUsers().subscribe(users => {
        this.users=users;
        for(let user of this.users){
          user.class="btn btn-primary";
          user.is_selected=false;
        }
      });
    });
  }

  selectUser(user: User){//Diese Funktion ist als Buttonevent für die Auswahl eines Users der einen Beitrag nicht sehen soll verantwortlich.
   
    if(!user.is_selected){
      user.class="btn btn-secondary";
      user.is_selected=!user.is_selected;
      this.selected_users.push(user);
      console.log(this.selected_users);
    }
    else{
      user.class="btn btn-primary";
      user.is_selected=!user.is_selected;
      const index = this.selected_users.findIndex(user => user===user.id); 
      this.selected_users.splice(index, 1); 
      console.log(this.selected_users);
    }
  }

  onSubmit(){//Diese Methode erstellt einen Beitrag und erstellt gleichzeitig die Einschränkungen für die ausgewählten User.
    var a=0;
    this.post = {
      user_id:this.user.id,
      title:this.title,
      body:this.body,
      likes:a,
      dislikes:a
    }
      
      this.postService.createPost(this.post).subscribe(
        data=>this.handleResponse(data),
        error=>this.error=error.error.error
      );
      
      
  }

  handleResponse(data){//Diese Methode erstellt eine Einschränlung sobald der Beitrag erfolgreich erstellt wurde
    this.post=data;
    if(this.selected_users.length>0){
      for(let selecteduser of this.selected_users){
        var restTemp:Restriction;
        restTemp={
          post_id:this.post.id,
          user_id:selecteduser.id
        }
        this.postService.createRestriction(restTemp).subscribe(data=>console.log(data));
      }
    }
    this.router.navigateByUrl('/dashboard');
  }
}
