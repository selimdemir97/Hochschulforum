import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  title=localStorage.getItem('title');
  body=localStorage.getItem('body');
  post:Post;
  user: User = {
    email: undefined
  }

  constructor(private userService: UserService,
    private router: Router,
    private postService: PostsService,
    private route:ActivatedRoute) { }

  onSubmit(){//Diese Methode ist für das Editieren des Beitrags verantwortlich, sie lädt die im localStorage gespeicherten Daten 
    let _id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.post = {
        id:_id,
        title:this.title,
        body:this.body
      }
      this.postService.updatePost(this.post).subscribe(data=>console.log(data));
      this.router.navigateByUrl('/profile');
    localStorage.removeItem('title');
    localStorage.removeItem('body');
  }
  ngOnInit() {
  }

}
