import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts/posts.service';
import { Comment } from '../comment/comment.model';
import { Post } from '../posts/post.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments:Comment[];
  cansee:boolean=true;
  post:Post={
    title:"",
    body:""
  };
  error:String;
  current_user:User={
    email:undefined
  }
  users:User[];
 

  constructor(private route:ActivatedRoute,
    private postsService: PostsService,
    private userService: UserService,
    private router: Router) { }


  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userService.getCurrentUser().subscribe(user=>{
      this.current_user=user,
      user.post_id=id;
      this.postsService.findRestriction(user).subscribe(number=>{
        if(number==0){
          this.cansee=false;
          this.post.title="Ups etwas ist schief gelaufen";
          this.post.body="Auf diesen Beitrag darfst du nicht zugreifen.";
        }else{
          this.postsService.getPost(id).subscribe(data=>{
            this.post=data;
            this.postsService.getUsers().subscribe(users => {
              this.users=users;
              this.postsService.getCommentsById(id).subscribe(data=>{
                if(data.length>500){
                  this.error="Anzahl an Kommentaren wurde überschritten";
                }else{ 
                  this.comments=data;
                }
              });
            });
          });
        }
      });
    });
  }

  delete(id:number){//Die Funktion löscht einen Kommentar
    this.postsService.deleteComment(id).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl('/dashboard');
    });
  }
  store(body:string){//Diese Funktion fügt den Text eines Kommentars in die localStorage damit sie beim Editieren in der update-comment.component aufgerufen kann
    localStorage.setItem('bodyc',body);
  }
  

}
