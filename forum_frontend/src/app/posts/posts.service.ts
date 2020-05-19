import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "./post.model";
import { User } from '../user/user.model';
import { Comment } from '../comment/comment.model';
import { Rating } from '../dashboard/rating.model';
import { Restriction } from '../create-post/restriction.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  apiURL = 'http://localhost/';

  constructor(private http: HttpClient) { }

  getLikes(sum:number){
    return this.http.post<number>(this.apiURL+'api/getLikes',sum,httpOptions)
  }
  getDislikes(sum:number){
    return this.http.post<number>(this.apiURL+'api/getDislikes',sum,httpOptions)
  }
  getPostcount(sum:number){
    return this.http.post<number>(this.apiURL+'api/getPostcount',sum,httpOptions)
  }
  wallPost(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.apiURL+'api/wallpost',comment,httpOptions)
  }
  getUserRatings(user: User){
    return this.http.post<Rating[]>(this.apiURL+'api/getUserRatings',user,httpOptions)
  }
  getWall(id:number){
    return this.http.post<Comment[]>(this.apiURL+'api/getWall',id,httpOptions)
  }
  findRestriction(user:User){
    return this.http.post<number>(this.apiURL+'api/findRestriction',user,httpOptions)
  }
  deleteWall(wall: Comment): Observable<Comment>{
    return this.http.post<Comment>('http://localhost/api/deleteWall',wall,httpOptions);
  }
  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('http://localhost/getpost');
  }
  getFavorites(): Observable<Rating[]>{
    return this.http.get<Rating[]>('http://localhost/getfavs');
  }
  getRestrictions(): Observable<Restriction[]>{
    return this.http.get<Restriction[]>('http://localhost/getRestrictions');
  }
  deleteFav(fav: Rating): Observable<Rating>{
    return this.http.post<Rating>('http://localhost/api/deleteFav',fav,httpOptions);
  }
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost/getuser');
  }
  getCommentsById(id: number): Observable<Comment[]>{
    return this.http.post<Comment[]>('http://localhost/api/getComments',id, httpOptions);
  }
  getPost(id: number): Observable<Post>{
    return this.http.post<Post>('http://localhost/api/getPostfC',id, httpOptions);
  }
  createPost(post:Post): Observable<Post>{
    return this.http.post<Post>('http://localhost/api/createPost',post, httpOptions);
  }
  deletePost(id:number){
    return this.http.post<number>('http://localhost/api/deletePost',id,httpOptions);
  }
  deleteComment(id:number){
    return this.http.post<number>('http://localhost/api/deleteComment',id,httpOptions);
  }
  updatePost(post:Post): Observable<Post>{
    return this.http.post<Post>('http://localhost/api/updatePost',post, httpOptions);
  }
  createComment(comment:Comment): Observable<Comment>{
    return this.http.post<Post>('http://localhost/api/creatComment',comment, httpOptions);
  }
  createRestriction(restriction:Restriction): Observable<Restriction>{
    return this.http.post<Restriction>('http://localhost/api/createRestriction',restriction, httpOptions);
  }
  updateComment(comment:Comment): Observable<Comment>{
    return this.http.post<Comment>('http://localhost/api/updateComment',comment, httpOptions);
  }
  checklike(rating: Rating){
    return this.http.post<any>('http://localhost/api/checklikes',rating, httpOptions);
  }
  checkdislike(rating:Rating){
    return this.http.post<any>('http://localhost/api/checkdislikes',rating, httpOptions);
  }
  like(rating: Rating){
    return this.http.post<any>('http://localhost/api/likePost',rating, httpOptions);
  }
  dislike(rating: Rating){
    return this.http.post<any>('http://localhost/api/dislikePost',rating, httpOptions);
  }
  favorite(rating: Rating){
    return this.http.post<any>('http://localhost/api/favorite',rating, httpOptions);
  }
}