import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { Rating } from '../dashboard/rating.model';
import { Comment } from '../comment/comment.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public loggedInUser:User;
  user: User = {
    email: undefined
  }
  body:string;
  posts:Post[];
  favorites: Rating[];
  favorite:Rating;
  comment:Comment;
  comments:Comment[];
  users:User[];
  comment2:Comment;
  sumPosts:number;
  sumLikes:number;
  sumDislikes:number;
  
  constructor(private userService: UserService,
    private router: Router,
    private postService: PostsService) { }

    wallPost(){//Diese Methode erstellt einen Pinnwandeintrag auf dem eigenen Profil
      this.comment={
        user_id:this.user.id,
        p_user_id:this.user.id,
        body:this.body
      }
      this.postService.wallPost(this.comment).subscribe(data=>{
        window.location.reload();
      });
      
    }

    deleteWall(puid:number,uid:number){//Diese Mehtode löscht einen Pinnwandeintrag auf dem eigenen Profil
      this.comment2={
        p_user_id:puid,
        user_id:uid
      }
      this.postService.deleteWall(this.comment2).subscribe(data=>{
        window.location.reload();
      });
    }
  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data=>{
      this.user=data
      this.user.created_at=data.created_at,
      this.postService.getLikes(data.id).subscribe(sum=>{
        this.sumLikes=sum
        this.postService.getDislikes(data.id).subscribe(sum=>{
          this.sumDislikes=sum
          this.postService.getPostcount(data.id).subscribe(sum=>{
            this.sumPosts=sum
            this.postService.getWall(this.user.id).subscribe(data=>{
              this.comments=data;
              this.postService.getUsers().subscribe(users => {
                this.users=users;
                this.postService.getPosts().subscribe(data=>{
                  this.posts=data;
                  this.postService.getFavorites().subscribe(data=>{
                    this.favorites=data;
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  deleteFav(fid:number, pid:number){//Diese Methode löscht einen favorisierten Beitrag.
    this.favorite={
      user_id:fid,
      post_id:pid
    }
    this.postService.deleteFav(this.favorite).subscribe(data=>{
      window.location.reload();
      });

  }

  delete(id:number){//Diese Methode löscht einen Beitrag.
    this.postService.deletePost(id).subscribe(data=>{
      window.location.reload();
    });
  }

  store(title:string,body:string){//Diese Methode speicht den Titel und den Text eines vorhandenen Beitrags damit sie beim Editieren im update-post.component weiterbenutzt werden können.
    localStorage.setItem('title',title);
    localStorage.setItem('body',body);
  }
  
 

}
