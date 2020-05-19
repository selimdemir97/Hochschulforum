import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { PostsService } from '../posts/posts.service';
import { Comment } from '../comment/comment.model';

@Component({
  selector: 'app-another-profile',
  templateUrl: './another-profile.component.html',
  styleUrls: ['./another-profile.component.css']
})
export class AnotherProfileComponent implements OnInit {
  body:string;
  comment:Comment={
    p_user_id:undefined
  }
  comment2:Comment;
  comments:Comment[];
  users:User[];
  user: User = {
    email: undefined
  }
  user2:User={
    email:undefined
  }

  constructor(private route:ActivatedRoute,
    private userService:UserService,
    private postService:PostsService) { }

    wallPost(id2:number){ //Die Funktion erstellt einen Pinnwandeintrag auf einem anderen Account
      this.userService.getCurrentUser().subscribe(user => {
        this.user2=user;
        let id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.comment={
          user_id:id,
          p_user_id:this.user2.id,
          body:this.body
        }
        this.postService.wallPost(this.comment).subscribe(data=>{
          window.location.reload();
        });
      });
      
    }

    deleteWall(puid:number,uid:number){ //Diese Funktion löscht einen eigenen Pinnwandeintrag auf einem fremden Profil 
      this.comment={
        p_user_id:puid,
        user_id:uid
      }
      this.postService.deleteWall(this.comment).subscribe(data=>{
        window.location.reload();
      });
    }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user2=user;
      let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.userService.getById(id).subscribe(data=>{
        this.user.email=data.email,
        this.user.name=data.name,
        this.user.created_at=data.created_at,
        console.log(data);
        this.postService.getWall(id).subscribe(data=>{
          this.comments=data;
          this.postService.getUsers().subscribe(users => {
            this.users=users;
          });
        });
      });
    });
  }
}
