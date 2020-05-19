import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment/comment.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts/posts.service';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  title:string;
  body:string;
  comment:Comment;
  user: User = {
    email: undefined
  }


  constructor(private userService: UserService,
    private router: Router,
    private postService: PostsService,
    private route:ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(){ //Die Funktion ist zuständig für das Erstellen eines Kommentars          
    let id = parseInt(this.route.snapshot.paramMap.get('id'));  
    this.userService.getCurrentUser().subscribe(data=>{   
      this.user.id=data.id
      this.comment = {
        user_id:this.user.id,
        body:this.body,
        post_id:id
      }
      this.postService.createComment(this.comment).subscribe(data=>console.log(data));
      this.router.navigateByUrl(id+'/comments');
    });
  }

}
