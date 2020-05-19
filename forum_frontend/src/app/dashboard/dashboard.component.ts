import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Rating } from './rating.model';
import { Restriction } from '../create-post/restriction.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() btn: string;
  rating:Rating;
  ratings:Rating[];
  favorites:Rating[];
  restrictions:Restriction[];
  posts= new Array<Post>();
  users:User[];
  user:User;
  class1="";
  class2="btn btn-primary";
  class3="Zu Favoriten hinzufügen";

  like1="";
  like2="btn btn-primary but";
  like3="Gefällt mir";

  dislike1="";
  dislike2="btn btn-primary but";
  dislike3="Gefällt mir nicht";

  name:string;


  constructor(private postService: PostsService,
    private userService:UserService) { }

  checkFavs(nr:number){//Diese Funktion überprüft ob ein Beitrag als Favorit hinzugefügt wurde und ändert den Button dementsprechend
    for(let fav of this.favorites){
      if(fav.post_id==nr&&fav.user_id==this.user.id){
        this.class1="";
        this.class2="btn btn-secondary";
        this.class3="Zu Favoriten hinzugefügt";
        return true;
      }
      this.class1="";
      this.class2="btn btn-primary";
      this.class3="Zu Favoriten hinzufügen";
    }
    return true;
  }
  search(){//Diese Methode ist für die Suche eines Beitrags zuständig.
    if(this.name!=""){
      this.posts=this.posts.filter(res=>{
        return res.title.toLowerCase().match(this.name.toLowerCase());
      });
    }else if(this.name==""){
      this.ngOnInit();
    }
    
  }

  ngOnInit() {
    
    this.userService.getCurrentUser().subscribe(user => {
      this.user=user;
      this.postService.getUserRatings(user).subscribe(data=>{
        console.log(this.ratings);
        this.ratings=data;
        
      });
    this.postService.getFavorites().subscribe(favorites => {
      this.favorites=favorites;
    }); 
    
      this.postService.getPosts().subscribe(posts => {
        //this.posts=posts;
        this.postService.getRestrictions().subscribe(restrictions=>{
          this.restrictions=restrictions;
          for(let post of posts){
            this.posts.push(post);
            for(let res of restrictions){
              if(post.id==res.post_id&&this.user.id==res.user_id){
                this.posts.pop();
                break;
              }
            }
          }
          this.postService.getUsers().subscribe(users => {
            this.users=users;
          });
        });
      });
    });
  }
 
  checklike(post_id:number){//Die Methode überprüft ob ein Beitrag bereits geliked wurde.
    this.rating={
      user_id:this.user.id,
      post_id:post_id
    }
    this.postService.checklike(this.rating).subscribe(bool => {
      if(bool==0){
        this.postService.like(this.rating).subscribe(bool => {
            window.location.reload();
        });
      }
    });
  }
  checkdislike(post_id:number){//Die Methode überprüft ob ein Beitrag bereits gedisliked wurde.
    this.rating={
      user_id:this.user.id,
      post_id:post_id
    }
    this.postService.checkdislike(this.rating).subscribe(bool => {
      if(bool==0){
        this.postService.dislike(this.rating).subscribe(bool => {
          window.location.reload();
        });
      }
    });
  }

  findlike(post_id:number){//Diese Methode färbt einen Button je nach dem geliket wurde oder nicht
    this.like1="";
        this.like2="btn btn-primary but";
        this.like3="Gefällt mir";
    for(let i=0; i<this.ratings.length;i++){
      console.log();
      if(this.ratings[i].post_id==post_id&&this.ratings[i].user_id==this.user.id&&this.ratings[i].liked){
        this.like1="";
        this.like2="btn btn-secondary but";
        this.like3="Gefällt dir";
        return true;
      }
    }
    return true;
  }

  finddislike(post_id:number){//Diese Methode färbt einen Button je nach dem gedisliket wurde oder nicht
    this.dislike1="";
        this.dislike2="btn btn-primary but";
        this.dislike3="Gefällt mir nicht";
    for(let i=0; i<this.ratings.length;i++){
      console.log();
      if(this.ratings[i].post_id==post_id&&this.ratings[i].user_id==this.user.id&&this.ratings[i].disliked){
        this.dislike1="";
        this.dislike2="btn btn-secondary but";
        this.dislike3="Gefällt dir nicht";
        return true;
      }
    }
    return true;
  }

  favorite(post_id:number){//Diese Methode favorisiert einen Beitrag.
    this.rating={
      user_id:this.user.id,
      post_id:post_id
    }
    this.postService.favorite(this.rating).subscribe(bool => {
      window.location.reload();
    });
  }

}
