import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts/posts.service';
import { User } from '../user/user.model';
import { Comment } from '../comment/comment.model';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {
  body=localStorage.getItem('bodyc');
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
  onSubmit(){//Diese Methode ist für das Editieren des Kommentars verantwortlich, sie lädt die im localStorage gespeicherten Daten 
    let _id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.comment = {
        id:_id,
        body:this.body
      }
      this.postService.updateComment(this.comment).subscribe(data=>console.log(data));
      this.router.navigateByUrl('/dashboard');
    localStorage.removeItem('bodyc');
  }
}
